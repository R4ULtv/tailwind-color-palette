import { colors } from "@/lib/colors";

import { ColorButtonTailwind } from "@/components/ui/ColorButton";
import SelectFormatMenu from "@/components/ui/SelectFormatMenu";

export default function Home() {
  return (
    <div className="mt-8 sm:mt-4 pt-4 space-y-3" id="colors">
      <div className="flex items-center justify-end">
        <SelectFormatMenu />
      </div>
      <div className="grid gap-4 sm:gap-6 w-full">
        {Object.keys(colors).map((color) => (
          <div
            className="flex flex-col sm:flex-row gap-2 overflow-x-auto border border-zinc-800 hover:border-zinc-700 rounded-xl sm:rounded-2xl p-2"
            key={color}
          >
            {colors[color].map((item) => (
              <ColorButtonTailwind key={item.scale} item={item} color={color} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
