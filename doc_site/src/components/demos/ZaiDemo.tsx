import Terminable from "#/components/ui/Terminable";
import type { CommandEntry } from "#/components/ui/Terminable";

const commands: CommandEntry[] = [
  {
    prompt: "./limitaid zai",
    output: `Z.ai Coding Plan (pro)
├─ 5h window:     3% used █░░░░░░░░░░░░░░░░░░░░ resets in 3h22m
│  └─ MCP usage: search-prime: 9, web-reader: 4, zread: 22
└─ Weekly tokens: 1% used ░░░░░░░░░░░░░░░░░░░░░ resets in 5d14h`,
  },
];

export default function ZaiDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <Terminable
        commands={commands}
        termPrompt="$ "
        title="bash"
        titleBarVariant="macos"
        height="min-h-[280px] max-h-[500px]"
        defaultTypingSpeed={40}
        defaultOutputSpeed={15}
        start={true}
        allowCopy={true}
      />
    </div>
  );
}
