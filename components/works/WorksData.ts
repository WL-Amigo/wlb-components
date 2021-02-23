export type WorkEntry = {
  readonly title: string;
  readonly bgColor: string; // bg-{tailwind color}-50
  readonly gradColor: string; // to-{tailwind color}-50
  readonly url: string;
};
export type WorkGroup = {
  readonly name: string;
  readonly works: readonly WorkEntry[];
};
export const WorksData: readonly WorkGroup[] = [
  {
    name: "ブラウザアプリ",
    works: [
      {
        title: "いいね風エフェクト\nアニメジェネレータ",
        bgColor: "bg-pink-50",
        gradColor: "to-pink-50",
        url: "http://wl-amigo.github.io/LikeLikeEffectGenerator/",
      },
    ],
  },
  {
    name: "PC用ソフトウェア",
    works: [
      {
        title: "LoopMID2LoopOGG",
        bgColor: "bg-blue-50",
        gradColor: "to-blue-50",
        url: "https://wl-amigo.github.io/LoopMID2LoopOGG/",
      },
    ],
  },
];
