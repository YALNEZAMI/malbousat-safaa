import { defineStore } from "pinia";
export const useStore = defineStore("store", {
  state: () => {
    return {
      att: "val",
      products: [
        {
          id: "sjfdnsn",
          name: "بنطال ولادي",
          price: 20000,
          description:
            "تاهلاس بسيل لسبلبي ليبليبل سليس ليبليبس ليبلبسي لسيبليس ليلسي ليبليبس ليبليس يبليسبل ليبليس ابييس بايلي لبيسلي لقيبل",
          photos: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgRZ6P7-sfs3pgBwfTftmTV6zooPQJ5rc6GA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK7xolEYcL_fTJaOflWMdp0gchHvZhglqEg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSogH6QuMKclF33bJBln5MhhTQdZeJMEZ941g&s",
          ],
          sizes: ["xs", "l"],
        },
        {
          id: "fdhsjcdks",
          name: "بجامة ولادي",
          price: 10000,
          description:
            "تاهلاس بسيل لسبلبي ليبليبل سليس ليبليبس ليبلبسي لسيبليس ليلسي ليبليبس ليبليس يبليسبل ليبليس ابييس بايلي لبيسلي لقيبل",
          photos: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgRZ6P7-sfs3pgBwfTftmTV6zooPQJ5rc6GA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK7xolEYcL_fTJaOflWMdp0gchHvZhglqEg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSogH6QuMKclF33bJBln5MhhTQdZeJMEZ941g&s",
          ],
        },
        {
          id: "nvksdkb",
          name: "كنزة ولادي",
          price: 3000,
          description:
            "تاهلاس بسيل لسبلبي ليبليبل سليس ليبليبس ليبلبسي لسيبليس ليلسي ليبليبس ليبليس يبليسبل ليبليس ابييس بايلي لبيسلي لقيبل",
          photos: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgRZ6P7-sfs3pgBwfTftmTV6zooPQJ5rc6GA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK7xolEYcL_fTJaOflWMdp0gchHvZhglqEg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSogH6QuMKclF33bJBln5MhhTQdZeJMEZ941g&s",
          ],
        },
      ],
    };
  },
  actions: {
    setAtt(newVal: string) {
      this.att = newVal;
    },
  },
});
