# lib/http.sh - HTTP helper for LimitAID
# Provides: http_get, http_get_json
# Requires: curl, jq (for http_get_json)

# http_get <url> <auth_header> <output_var_name>
# Performs a GET request with Bearer token auth
# Sets global: _http_status with HTTP status code
# Writes response body to the named variable via printf -v
http_get() {
	local url="$1"
	local auth_header="$2"
	local out_var="$3"

	_http_status=""
	local tmp_body
	tmp_body="$(mktemp)"
	local tmp_headers
	tmp_headers="$(mktemp)"

	curl --silent \
		--show-error \
		--fail-with-body \
		--connect-timeout 10 \
		--max-time 30 \
		--dump-header "$tmp_headers" \
		--output "$tmp_body" \
		-w "%{http_code}" \
		-H "Authorization: Bearer ${auth_header}" \
		"$url" > "${tmp_body}.status" 2>/dev/null || true

	# Read status code from curl's write-out
	_http_status="$(tr -d '[:space:]' < "${tmp_body}.status" 2>/dev/null)"

	# Fallback: parse status from headers
	if [ -z "$_http_status" ] || [ "$_http_status" = "000" ]; then
		_http_status="$(grep -i '^HTTP/' "$tmp_headers" 2>/dev/null | tail -1 | awk '{print $2}' | tr -d '[:space:]')"
	fi

	# Default to 000 if we still have nothing
	if [ -z "$_http_status" ]; then
		_http_status="000"
	fi

	# Write body to named variable
	printf -v "$out_var" '%s' "$(cat "$tmp_body" 2>/dev/null)"

	# Cleanup
	rm -f "$tmp_body" "$tmp_headers" "${tmp_body}.status"

	return 0
}

# http_get_json <url> <auth_header> <output_var_name>
# Same as http_get but validates JSON response
# Writes parsed JSON to the named variable, error message on failure
http_get_json() {
	local url="$1"
	local auth_header="$2"
	local out_var="$3"

	http_get "$url" "$auth_header" "$out_var"

	if [ "$_http_status" -ne 200 ] 2>/dev/null; then
		return 1
	fi

	# Validate it's valid JSON
	local response="${!out_var}"
	if echo "$response" | jq -e '.' >/dev/null 2>&1; then
		return 0
	else
		echo "Error: invalid JSON response" >&2
		return 1
	fi
}
