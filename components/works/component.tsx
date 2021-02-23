import { Component, createEffect, createSignal, For } from "solid-js";
import { Transition } from "solid-transition-group";
import { customElement } from "solid-element";
import Style from "./style.inline.css";
import { WorkEntry, WorkGroup, WorksData } from "./WorksData";

type WorksComponentProps = {
  isOpen: boolean;
  onClose: () => void;
};

const stopPropagation = (e: Event): void => e.stopPropagation();
const requestAnimationFrame = window.requestAnimationFrame;

const WLBWorks: Component<WorksComponentProps> = (props) => {
  const [isInnerOpen, setInnerOpen] = createSignal(false);
  createEffect(() => {
    const isOpen = props.isOpen;
    if (isOpen) {
      requestAnimationFrame(() => setInnerOpen(true));
    } else {
      requestAnimationFrame(() => setInnerOpen(false));
    }
  });

  return (
    <>
      <style>{Style}</style>
      <Transition
        enterActiveClass="duration-200 transition-opacity"
        exitActiveClass="duration-200 transition-opacity"
        enterClass="opacity-0"
        exitToClass="opacity-0"
      >
        {props.isOpen && (
          <div
            class="flex flex-row justify-center items-center bg-black bg-opacity-50 fixed w-full h-full inset-0 opacity-1"
            onClick={() => props.onClose?.()}
          >
            <Transition
              enterActiveClass="duration-200"
              exitActiveClass="duration-200"
              enterClass="blur-8"
              exitToClass="blur-8"
            >
              {isInnerOpen() && <WorksModal onClose={props.onClose} />}
            </Transition>
          </div>
        )}
      </Transition>
    </>
  );
};

const WorksModal: Component<{ onClose: () => void }> = (props) => {
  const [bgColor, setBgColor] = createSignal("bg-white");
  const onHoveredWorkChanged = (w: WorkEntry | undefined) => {
    if (w !== undefined) {
      setBgColor(w.bgColor);
    } else {
      setBgColor("bg-white");
    }
  };
  return (
    <div
      class="relative md:rounded p-4 blur-0 w-full h-full md:w-auto md:h-auto transition-all"
      className={bgColor()}
      onClick={stopPropagation}
    >
      <div
        class="absolute right-0 top-0 flex flex-row justify-center items-center w-14 h-14 cursor-pointer"
        onClick={props.onClose}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <div class="divide-y divide-gray-300 w-full h-full">
        <h1 class="text-xl font-bold pb-2 text-center">
          WhiteLuckBringers 作品集
        </h1>
        <div class="pb-2 pt-4 space-y-2">
          <For each={WorksData}>
            {(g) => (
              <WorkGroupRenderer
                group={g}
                onHoveredWorkChanged={onHoveredWorkChanged}
              />
            )}
          </For>
        </div>
        <div class="flex flex-row justify-center pt-2">
          <a
            href="https://white-luck-bringers.netlify.app/"
            target="_blank"
            rel="noopenner noreferrer"
            class="hover:underline text-blue-800"
          >
            WhiteLuckBringers サークルサイト
          </a>
        </div>
      </div>
    </div>
  );
};

const WorkGroupRenderer: Component<{
  group: WorkGroup;
  onHoveredWorkChanged: (w: WorkEntry | undefined) => void;
}> = (props) => {
  return (
    <div class="space-y-2">
      <h2>{props.group.name}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <For each={props.group.works}>
          {(w) => (
            <a
              href={w.url}
              target="_blank"
              rel="noopenner noreferrer"
              class="flex flex-row items-center w-full md:w-auto p-2 rounded bg-gradient-to-r md:bg-none from-white md:hover:bg-white hover:shadow-md transition-all duration-200"
              className={w.gradColor}
              onMouseEnter={() => props.onHoveredWorkChanged(w)}
              onMouseLeave={() => props.onHoveredWorkChanged(undefined)}
            >
              <div class="w-16 h-16 rounded bg-gray-500"></div>
              <div class="pl-2">
                <h3>
                  {w.title
                    .split("\n")
                    .map((l) => [l, <br />])
                    .flat()
                    .slice(0, -1)}
                </h3>
              </div>
            </a>
          )}
        </For>
      </div>
    </div>
  );
};

customElement(
  "wlb-works",
  {
    isOpen: false,
    onClose: () => {
      return;
    },
  },
  WLBWorks
);
