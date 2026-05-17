#!/usr/bin/env bash

_limitaid_complete() {
	local cur prev words cword
	if declare -F _init_completion >/dev/null 2>&1; then
		_init_completion -n : || return
	else
		COMPREPLY=()
		cur="${COMP_WORDS[COMP_CWORD]}"
		prev="${COMP_WORDS[COMP_CWORD-1]}"
		words=("${COMP_WORDS[@]}")
		cword="$COMP_CWORD"
	fi

	local top_level_opts providers common_opts named_opts
	top_level_opts="--help --version"
	providers="codex openrouter zai all"
	common_opts="--conf -c --provider-config --loop --json --no-json --help -h --verbose --quiet"
	named_opts="--name -n"

	if [[ "$prev" == "--conf" || "$prev" == "-c" ]]; then
		COMPREPLY=( $(compgen -f -- "$cur") )
		return
	fi

	if (( cword == 1 )); then
		COMPREPLY=( $(compgen -W "$providers $top_level_opts" -- "$cur") )
		return
	fi

	case "${words[1]}" in
		codex)
			COMPREPLY=( $(compgen -W "$common_opts" -- "$cur") )
			;;
		openrouter)
			COMPREPLY=( $(compgen -W "$common_opts $named_opts" -- "$cur") )
			;;
		zai)
			COMPREPLY=( $(compgen -W "$common_opts $named_opts" -- "$cur") )
			;;
		all)
			COMPREPLY=( $(compgen -W "$common_opts" -- "$cur") )
			;;
		*)
			COMPREPLY=( $(compgen -W "$providers $top_level_opts" -- "$cur") )
			;;
	esac
}

complete -F _limitaid_complete limitaid
complete -F _limitaid_complete ./limitaid
