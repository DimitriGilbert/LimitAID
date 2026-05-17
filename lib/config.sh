# lib/config.sh - Key configuration loading for LimitAID
# Provides: config_load_keys, _parse_provider_config
#
# Config file format (~/.config/limitaid/keys.conf):
#   Lines starting with # are comments
#   Format: <provider>_<name>=<path_to_file_containing_key>
#   Example: openrouter_work=/home/user/.secrets/openrouter_work
#   The file at the path contains the raw key value

# Default config file path
_LIMITAID_DEFAULT_CONF="${HOME}/.config/limitaid/keys.conf"

# _parse_provider_config <override_string>
# Parses "provider::key_value[::name]" format
# Sets globals: _ppc_provider, _ppc_key, _ppc_name
_parse_provider_config() {
	local override_string="$1"
	_ppc_provider=""
	_ppc_key=""
	_ppc_name="override"

	# Split by ::
	local rest
	_ppc_provider="${override_string%%::*}"
	rest="${override_string#*::}"

	if [ "$rest" = "$override_string" ]; then
		# No :: found, invalid format
		_ppc_provider=""
		_ppc_key=""
		_ppc_name=""
		return 1
	fi

	# Check for optional third segment (::name)
	local after_key
	after_key="${rest#*::}"
	if [ "$after_key" != "$rest" ]; then
		# Third segment exists
		_ppc_key="${rest%%::*}"
		_ppc_name="$after_key"
	else
		_ppc_key="$rest"
	fi

	return 0
}

# _auto_discover_key <provider>
# Attempts to auto-discover API keys from well-known locations
# Returns the key value on stdout, or empty string if not found
_auto_discover_key() {
	local provider="$1"

	case "$provider" in
		codex)
			# Read from ~/.codex/auth.json -> tokens.access_token
			local auth_file="${HOME}/.codex/auth.json"
			if [ -f "$auth_file" ]; then
				jq -r '.tokens.access_token // empty' "$auth_file" 2>/dev/null
			fi
			;;
		zai)
			# Read from ~/.config/opencode/opencode.json -> provider.zai-coding-plan.options.apiKey
			local conf_file="${HOME}/.config/opencode/opencode.json"
			if [ -f "$conf_file" ]; then
				jq -r '.provider."zai-coding-plan".options.apiKey // empty' "$conf_file" 2>/dev/null
			fi
			;;
		openrouter)
			# No auto-discovery for openrouter
			;;
	esac
}

# _load_keys_from_conf <provider> <conf_file>
# Reads keys from a config file for a given provider
# Sets entries in the _keys associative array
_load_keys_from_conf() {
	local provider="$1"
	local conf_file="$2"

	if [ ! -f "$conf_file" ]; then
		return 0
	fi

	while IFS= read -r line || [ -n "$line" ]; do
		# Skip comments and empty lines
		local trimmed
		trimmed="$(echo "$line" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')"
		[ -z "$trimmed" ] && continue
		[[ "$trimmed" == \#* ]] && continue

		# Parse: <provider>_<name>=<path>
		local key_path entry_provider entry_name
		entry_name="${trimmed%%=*}"
		key_path="${trimmed#*=}"

		# Skip if key_path is empty
		[ -z "$key_path" ] && continue

		# Extract provider prefix
		entry_provider="${entry_name%%_*}"
		entry_name="${entry_name#*_}"

		# Skip if provider doesn't match
		[ "$entry_provider" != "$provider" ] && continue

		# Read the actual key from the file path
		if [ -f "$key_path" ]; then
			local actual_key
			actual_key="$(tr -d '\n' < "$key_path" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')"
			if [ -n "$actual_key" ]; then
				_keys["$entry_name"]="$actual_key"
			fi
		fi
	done < "$conf_file"
}

# config_load_keys <provider> [conf_file] [provider_config_override]
# Main entry point for key loading
# Populates the _keys associative array (must be declared by caller)
# Priority: CLI override > config file > auto-discover
config_load_keys() {
	local provider="$1"
	local conf_file="${2:-}"
	local provider_config_override="${3:-}"

	# Determine config file to use
	if [ -z "$conf_file" ]; then
		conf_file="$_LIMITAID_DEFAULT_CONF"
	fi

	# Step 1: Load from config file
	if [ -f "$conf_file" ]; then
		_load_keys_from_conf "$provider" "$conf_file"
	fi

	# Step 2: Handle CLI override (highest priority)
	if [ -n "$provider_config_override" ]; then
		local _ppc_provider _ppc_key _ppc_name
		if _parse_provider_config "$provider_config_override"; then
			# Validate provider matches
			if [ "$_ppc_provider" != "$provider" ]; then
				echo "Warning: provider-config specifies '$_ppc_provider' but subcommand is '$provider'" >&2
			else
				# Override replaces all discovered keys with single override key
				_keys=()
				_keys["$_ppc_name"]="$_ppc_key"
			fi
		else
			echo "Warning: invalid provider-config format: $provider_config_override" >&2
		fi
	fi

	# Step 3: Auto-discover if no keys found yet
	# Note: caller must use "declare -A _keys=()" (with =()) so that
	# ${#_keys[@]} works under set -u in bash 5.3+ even when empty
	if [ "${#_keys[@]}" -eq 0 ]; then
		local discovered_key
		discovered_key="$(_auto_discover_key "$provider")"
		if [ -n "$discovered_key" ]; then
			_keys["default"]="$discovered_key"
		fi
	fi
}
