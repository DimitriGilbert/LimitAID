# lib/output.sh - Output formatting for LimitAID
# Provides: output_section, output_limit_bar, output_key_header,
#           output_tree_start, output_tree_branch, output_tree_end
# Uses _has_colors (set by parseArger generated code)

# ANSI color codes. Use real escape bytes so callers can print them with %s.
_COLOR_GREEN=$'\033[0;32m'
_COLOR_YELLOW=$'\033[0;33m'
_COLOR_RED=$'\033[0;31m'
_COLOR_BOLD=$'\033[1m'
_COLOR_RESET=$'\033[0m'

# _color_for_usage <percent>
# Returns the color escape code for a given usage percentage
_color_for_usage() {
	local pct="$1"
	if [ "$_has_colors" = "1" ]; then
		if [ "$pct" -ge 80 ] 2>/dev/null; then
			printf '%s' "$_COLOR_RED"
		elif [ "$pct" -ge 50 ] 2>/dev/null; then
			printf '%s' "$_COLOR_YELLOW"
		else
			printf '%s' "$_COLOR_GREEN"
		fi
	else
		printf ''
	fi
}

# _color_reset
# Returns the reset escape code if colors are enabled
_color_reset() {
	if [ "$_has_colors" = "1" ]; then
		printf '%s' "$_COLOR_RESET"
	else
		printf ''
	fi
}

# output_section <title> [subtitle]
# Prints a section header with optional subtitle in parentheses
output_section() {
	local title="$1"
	local subtitle="${2:-}"

	if [ "$_has_colors" = "1" ]; then
		printf '%b' "$_COLOR_BOLD${title}${_COLOR_RESET}"
	else
		printf '%s' "$title"
	fi

	if [ -n "$subtitle" ]; then
		printf ' (%s)' "$subtitle"
	fi

	printf '\n'
}

# output_limit_bar <label> <percent_used> <resets_in> [bar_width]
# Prints a limit line with visual progress bar
# Example: "├─ 5h window:  11% used ██████░░░░░░░░░░░░░░░░ resets in 4h35m"
output_limit_bar() {
	local label="$1"
	local percent="$2"
	local resets_in="$3"
	local bar_width="${4:-20}"

	# Build the progress bar
	local filled=$((percent * bar_width / 100))
	local empty=$((bar_width - filled))

	local bar=""
	local i
	for (( i=0; i<filled; i++ )); do
		bar="${bar}█"
	done
	for (( i=0; i<empty; i++ )); do
		bar="${bar}░"
	done

	# Apply color to the bar
	local color
	color="$(_color_for_usage "$percent")"
	local reset
	reset="$(_color_reset)"

	printf '│  %-14s %3d%% used %s%s%s resets in %s\n' \
		"${label}:" "$percent" "$color" "$bar" "$reset" "$resets_in"
}

# output_key_header <name> <key_preview>
# Prints key identifier line
# Example: "├─ work (sk-...xxx)"
output_key_header() {
	local name="$1"
	local key_preview="$2"

	printf '├─ %s (%s)\n' "$name" "$key_preview"
}

# output_tree_start
# Prints nothing; tree starts at first branch
output_tree_start() {
	:
}

# output_tree_branch
# Prints a separator between tree items
output_tree_branch() {
	printf '├─\n'
}

# output_tree_end
# Prints the end of a tree section
output_tree_end() {
	printf '└─\n'
}

# json_output <json_string>
# Prints unified JSON. If _arg_json="on" (set by --json flag), this outputs
# the unified schema. Each provider constructs a JSON array of result objects
# and passes the whole array string to this function.
#
# Unified schema per entry:
# {
#   "provider": "codex",
#   "key_name": "default",
#   "plan": "...",
#   "limits": [ { "label": "...", "used_percent": N, "resets_in": "...", "resets_at": N } ],
#   "credits": { "balance": N, "unlimited": bool },
#   "usage": { ... provider-specific fields ... },
#   "extra": { ... provider-specific fields ... },
#   "raw": { ... original API response ... }
# }
json_output() {
	local json_array="$1"
	printf '%s\n' "$json_array" | jq '.'
}
