import Terminable from "#/components/ui/Terminable";
import type { CommandEntry } from "#/components/ui/Terminable";

const commands: CommandEntry[] = [
  {
    prompt: "./limitaid all",
    output: `Codex/OpenAI (prolite)
├─ 5h window:  11% used ██████░░░░░░░░░░░░░░░░ resets in 4h35m
├─ Weekly:     12% used ███░░░░░░░░░░░░░░░░░░░░ resets in 6d5h
├─ Credits:    $0.00
└─ Spark:
   ├─ 5h window:   0% used ░░░░░░░░░░░░░░░░░░░░░ resets in 5h00m
   └─ Weekly:       0% used ░░░░░░░░░░░░░░░░░░░░░ resets in 7d0h

OpenRouter (work)
├─ Limit:        $50.00
├─ Remaining:    $42.50 / $50.00 (85%)
├─ Usage today:  $3.20
├─ Usage this week: $12.40
└─ Usage this month: $45.80

Z.ai Coding Plan (pro)
├─ 5h window:     3% used █░░░░░░░░░░░░░░░░░░░░ resets in 3h22m
│  └─ MCP usage: search-prime: 9, web-reader: 4, zread: 22
└─ Weekly tokens: 1% used ░░░░░░░░░░░░░░░░░░░░░ resets in 5d14h`,
  },
];

export default function AllDemo({
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
