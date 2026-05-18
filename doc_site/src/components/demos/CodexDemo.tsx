import Terminable from "#/components/ui/Terminable";
import type { CommandEntry } from "#/components/ui/Terminable";

const commands: CommandEntry[] = [
  {
    prompt: "./limitaid codex",
    output: `Codex/OpenAI (prolite)
├─ 5h window:  11% used ██████░░░░░░░░░░░░░░░░ resets in 4h35m
├─ Weekly:     12% used ███░░░░░░░░░░░░░░░░░░░░ resets in 6d5h
├─ Credits:    $0.00
└─ Spark:
   ├─ 5h window:   0% used ░░░░░░░░░░░░░░░░░░░░░ resets in 5h00m
   └─ Weekly:       0% used ░░░░░░░░░░░░░░░░░░░░░ resets in 7d0h`,
  },
];

export default function CodexDemo({
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
