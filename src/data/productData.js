const productData = [
  {
    name: "Produkt 1",
    id: "produkt1",
    price: 100,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 2",
    id: "produkt2",
    price: 200,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 3",
    id: "produkt3",
    price: 300,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 4",
    id: "produkt4",
    price: 400,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 5",
    id: "produkt5",
    price: 500,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 6",
    id: "produkt6",
    price: 600,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 7",
    id: "produkt7",
    price: 700,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 8",
    id: "produkt8",
    price: 800,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 9",
    id: "produkt9",
    price: 900,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 10",
    id: "produkt10",
    price: 1000,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 11",
    id: "produkt11",
    price: 1100,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
  {
    name: "Produkt 12",
    id: "produkt12",
    price: 1200,
    amount: 0,
    pic: "https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu sapien eu odio vestibulum feugiat. Ut consequat sapien mauris, et sagittis risus facilisis a. Pellentesque varius leo eget placerat blandit. Praesent vitae laoreet ipsum. Aliquam sed volutpat nibh, lacinia hendrerit velit. Integer eget accumsan nulla. Nunc arcu nulla, facilisis quis augue ut, finibus tincidunt eros. Vestibulum sed commodo tortor.",
  },
];

export default productData;
