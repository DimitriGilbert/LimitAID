# lib/time.sh - Time formatting helpers for LimitAID
# Provides: time_format_remaining, time_format_window

# time_format_remaining <reset_at_epoch_seconds>
# Converts epoch seconds to human-readable relative time from now
# Examples: "4h35m", "6d5h", "12m", "7d0h"
time_format_remaining() {
	local reset_at="$1"
	local now
	now="$(date +%s)"

	local diff=$((reset_at - now))

	# If already past the reset time
	if [ "$diff" -le 0 ]; then
		echo "now"
		return 0
	fi

	local days=$((diff / 86400))
	local hours=$(( (diff % 86400) / 3600 ))
	local minutes=$(( (diff % 3600) / 60 ))

	if [ "$days" -gt 0 ]; then
		echo "${days}d${hours}h"
	elif [ "$hours" -gt 0 ]; then
		echo "${hours}h${minutes}m"
	else
		echo "${minutes}m"
	fi
}

# time_format_window <seconds>
# Converts duration in seconds to human-readable format
# Examples: "5h", "7d", "30m", "1d6h"
time_format_window() {
	local seconds="$1"

	if [ "$seconds" -le 0 ]; then
		echo "0m"
		return 0
	fi

	local days=$((seconds / 86400))
	local hours=$(( (seconds % 86400) / 3600 ))
	local minutes=$(( (seconds % 3600) / 60 ))

	if [ "$days" -gt 0 ]; then
		if [ "$hours" -gt 0 ]; then
			echo "${days}d${hours}h"
		else
			echo "${days}d"
		fi
	elif [ "$hours" -gt 0 ]; then
		if [ "$minutes" -gt 0 ]; then
			echo "${hours}h${minutes}m"
		else
			echo "${hours}h"
		fi
	else
		echo "${minutes}m"
	fi
}
