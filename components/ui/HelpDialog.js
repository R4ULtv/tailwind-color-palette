"use client";

import { useState, useMemo } from "react";
import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { Drawer } from "vaul";

import { useMediaQuery } from "@/utils/hooks";
import { CssIcon, GithubIcon, TailwindIcon } from "@/utils/icons";

const CustomTab = ({ icon: Icon, text }) => (
  <Tab className="group text-zinc-100 data-selected:text-zinc-900 data-selected:bg-zinc-200 hover:bg-zinc-200 hover:text-zinc-900 font-medium flex items-center gap-1 transition duration-150 ease-out px-2 py-1 rounded-md text-sm">
    <Icon className="size-4 group-hover:scale-110 group-hover:rotate-12" />
    {text.split(" ").map((word, index) => (
      <span key={index} className="last:hidden md:last:block">
        {word}{" "}
      </span>
    ))}
  </Tab>
);

export default function HelpDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dialogContent = useMemo(
    () => (
      <TabGroup>
        <TabList className="flex items-center justify-center md:justify-start gap-1.5 mt-1">
          <CustomTab icon={TailwindIcon} text="Tailwind Config" />
          <CustomTab icon={CssIcon} text="CSS Variables" />
          <CustomTab icon={GithubIcon} text="Github Issue" />
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel className="space-y-1.5">
            <div className="text-zinc-300 bg-zinc-900 p-4 rounded-xl text-sm space-y-0.5">
              <p>
                To add your custom color palette, paste it into the{" "}
                <span className="bg-zinc-800 text-vscode-green font-mono text-xs px-1 py-0.5 rounded-sm">
                  tailwind.config.js
                </span>{" "}
                file. The recommended approach is to insert your new palette
                within the{" "}
                <span className="bg-zinc-800 text-vscode-light-blue font-mono text-xs px-1 py-0.5 rounded-sm">
                  theme.extend.colors
                </span>{" "}
                object.
              </p>
              <p>
                This method allows you to use both Tailwind's default colors and
                your custom palette.
              </p>
              <p>Here's an example of how to structure it:</p>
            </div>
            <pre className="bg-zinc-900 text-sm p-4 rounded-xl">
              <code>
                <p>
                  <span className="text-vscode-light-blue">theme</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-yellow">{" {"}</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">extend</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-purple">{" {"}</span>
                </p>
                <p className="ml-4 md:ml-8">
                  <span className="text-vscode-light-blue">colors</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-blue">{" {"}</span>
                </p>
                <p className="pl-7 md:pl-14 bg-white/10 w-min rounded-r pr-1">
                  <span className="text-vscode-green">
                    // insert here the copied code
                  </span>
                </p>
                <p className="pl-7 md:pl-14 bg-white/10 w-min pr-1">
                  <span className="text-vscode-light-blue">"sunset"</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-yellow">{" {"}</span>
                </p>
                <p className="pl-11 md:pl-20 bg-white/10 w-min rounded-r pr-1">
                  <span className="text-vscode-light-blue">"red"</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "#c28c70"</span>
                  <span className="text-zinc-300">,</span>
                  {isDesktop && (
                    <span className="text-vscode-green">
                      {" "}
                      // e.g.: text-sunset-red
                    </span>
                  )}
                </p>
                <p className="pl-11 md:pl-20 bg-white/10 w-min pr-1">
                  <span className="text-vscode-light-blue">"orange"</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "#FFD56B"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="pl-11 md:pl-20 bg-white/10 w-min rounded-br pr-1">
                  <span className="text-vscode-light-blue">"yellow"</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "#FF6BE3"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="pl-11 md:pl-20 bg-white/10 w-min pr-1">
                  <span className="text-vscode-light-blue">"pink"</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "#FF6BE3"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="pl-11 md:pl-20 bg-white/10 w-min rounded-r pr-1">
                  <span className="text-vscode-light-blue">"light-orange"</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "#FF9F6B"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="pl-7 md:pl-14 bg-white/10 w-min rounded-b pr-1">
                  <span className="text-vscode-yellow">{"}"}</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-4 md:ml-8">
                  <span className="text-vscode-blue">{"}"}</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-purple">{"}"}</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p>
                  <span className="text-vscode-yellow">{"}"}</span>
                </p>
              </code>
            </pre>
          </TabPanel>
          <TabPanel className="space-y-1.5">
            <div className="text-zinc-300 bg-zinc-900 p-4 rounded-xl text-sm space-y-0.5">
              <p>
                To add your custom color palette, paste it into the{" "}
                <span className="bg-zinc-800 text-vscode-green font-mono text-xs px-1 py-0.5 rounded-sm">
                  index.css
                </span>{" "}
                file. You can add your palette as CSS variables within the{" "}
                <span className="bg-zinc-800 text-vscode-light-blue font-mono text-xs px-1 py-0.5 rounded-sm">
                  :root
                </span>{" "}
                selector.
              </p>
              <p>
                This method allows you to use your custom palette throughout
                your project.
              </p>
              <p>Here's an example of how to structure it:</p>
            </div>
            <pre className="bg-zinc-900 text-sm p-4 rounded-xl">
              <code>
                <p>
                  <span className="text-vscode-light-yellow">:root</span>
                  <span className="text-vscode-yellow">{" {"}</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">--sunset-red</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> #FF6B6B</span>
                  <span className="text-zinc-300">;</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">
                    --sunset-orange
                  </span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> #FFA06B</span>
                  <span className="text-zinc-300">;</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">
                    --sunset-yellow
                  </span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> #FFD56B</span>
                  <span className="text-zinc-300">;</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">--sunset-pink</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> #FF6BE3</span>
                  <span className="text-zinc-300">;</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">
                    --sunset-light-orange
                  </span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> #FF9F6B</span>
                  <span className="text-zinc-300">;</span>
                </p>
                <p>
                  <span className="text-vscode-yellow">{"}"}</span>
                </p>
              </code>
            </pre>
          </TabPanel>
          <TabPanel className="space-y-1.5">
            <div className="text-zinc-300 bg-zinc-900 p-4 rounded-xl text-sm space-y-0.5">
              <p>
                Would you like to share your color palette with the community?
                You can submit a feature request on my GitHub repository. I'll
                review all submissions, but please make sure to follow these
                guidelines:
              </p>
              <ul className="list-disc ml-4 space-y-0.5">
                <li>
                  Use the{" "}
                  <span className="bg-zinc-800 text-vscode-light-blue font-mono text-xs px-1 py-0.5 rounded-sm">
                    "New Palette"
                  </span>{" "}
                  issue template when creating your request.
                </li>
                <li>Provide a clear name and description for your palette.</li>
                <li>Include the complete color codes for your palette.</li>
                <li>Explain the inspiration or use case for your palette.</li>
              </ul>
              <p>
                Here's an example of how to structure your palette feature
                request:
              </p>
            </div>
            <pre className="bg-zinc-900 text-sm p-4 rounded-xl">
              <code>
                <p>
                  <span className="text-vscode-yellow">{"{"}</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">name</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "Sunset"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">authors</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-purple">{" ["}</span>
                  <span className="text-vscode-tan">"r4ultv"</span>
                  <span className="text-vscode-purple">{"]"}</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">createdAt</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "2024-09-27"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-light-blue">colors</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-purple">{" ["}</span>
                </p>
                <p className="ml-4 md:ml-8">
                  <span className="text-vscode-blue">{"{"}</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">hex</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "#FF6B6B"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">rgb</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "rgb(255,107,107)"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">hsl</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "hsl(0,100%,71%)"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">className</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "sunset-red"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-4 md:ml-8">
                  <span className="text-vscode-blue">{"}"}</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-4 md:ml-8">
                  <span className="text-vscode-blue">{"{"}</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">hex</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "#FFA06B"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">rgb</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "rgb(255,160,107)"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">hsl</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "hsl(20,100%,71%)"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-7 md:ml-14">
                  <span className="text-vscode-light-blue">className</span>
                  <span className="text-zinc-300">:</span>
                  <span className="text-vscode-tan"> "sunset-orange"</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-4 md:ml-8">
                  <span className="text-vscode-blue">{"}"}</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-4 md:ml-8">
                  <span className="text-zinc-300">...</span>
                  <span className="text-vscode-light-blue">otherColors</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p className="ml-2 md:ml-4">
                  <span className="text-vscode-purple">{"]"}</span>
                  <span className="text-zinc-300">,</span>
                </p>
                <p>
                  <span className="text-vscode-yellow">{"}"}</span>
                </p>
              </code>
            </pre>
            <div className="text-zinc-300 bg-zinc-900 p-4 rounded-xl text-sm space-y-0.5">
              By following this format, you'll help me quickly understand and
              evaluate your palette submission. Thank you for contributing to
              our color palette collection!
            </div>
            <a
              href="https://github.com/R4ULtv/tailwind-color-palette/issues/new?assignees=&labels=enhancement&projects=&template=new_palette.md&title=%5BPalette+Name%5D+-+New+Palette+Request"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-200 text-zinc-900 px-8 py-1.5 rounded-lg text-sm font-semibold w-fit mx-auto flex items-center gap-1 justify-center shrink-0 select-none"
            >
              Create a Feature Request
              <ArrowTopRightOnSquareIcon className="size-4" />
            </a>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    ),
    [isDesktop]
  );

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="text-zinc-300 border border-zinc-700 px-2.5 py-2 md:px-2 md:py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 justify-center shrink-0 md:flex-none group select-none"
      >
        <QuestionMarkCircleIcon className="size-4 transform group-data-hover:scale-110 group-data-hover:rotate-12 transition duration-150" />
        <span className="hidden md:block">Need Help?</span>
      </Button>
      {isDesktop ? (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/40 z-20 data-closed:opacity-0 ease-out duration-150"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-20">
            <DialogPanel
              transition
              className="bg-zinc-900/50 backdrop-blur-xl flex flex-col rounded-2xl max-w-2xl w-full max-h-[90%] h-auto outline-hidden z-20 data-closed:opacity-0 data-closed:scale-50 ease-out duration-150"
            >
              <div className="p-6 flex-1 overflow-y-auto">
                <DialogTitle className="font-bold text-gray-200">
                  Do you need Help?
                </DialogTitle>
                <Description className="text-zinc-400 text-sm mb-2 text-balance">
                  This is a comprehensive guide on how to seamlessly integrate
                  the new colors palette into your Tailwind CSS configuration or
                  submit it as a Github Issue.
                </Description>
                {dialogContent}
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      ) : (
        <Drawer.Root open={isOpen} onClose={() => setIsOpen(false)}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-20" />
            <Drawer.Content className="bg-zinc-900/50 backdrop-blur-xl flex flex-col rounded-t-2xl mt-24 h-fit max-h-[95%] fixed bottom-0 inset-x-0 mx-auto w-full md:max-w-2xl outline-hidden z-20">
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="w-full">
                  <div
                    aria-hidden
                    className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-zinc-400 mb-4"
                  />
                  <Drawer.Title className="font-bold text-gray-200">
                    Do you need Help?
                  </Drawer.Title>
                  <Drawer.Description className="text-zinc-400 text-sm mb-2 text-balance">
                    This is a comprehensive guide on how to seamlessly integrate
                    the new colors palette into your Tailwind CSS configuration
                    or submit it as a Github Issue.
                  </Drawer.Description>
                  {dialogContent}
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  );
}
