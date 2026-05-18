import Terminable from "#/components/ui/Terminable";
import type { CommandEntry } from "#/components/ui/Terminable";

const commands: CommandEntry[] = [
  {
    prompt: "./limitaid openrouter",
    output: `OpenRouter (work)
├─ Limit:        $50.00
├─ Remaining:    $42.50 / $50.00 (85%)
├─ Usage today:  $3.20
├─ Usage this week: $12.40
└─ Usage this month: $45.80`,
  },
];

export default function OpenRouterDemo({
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
