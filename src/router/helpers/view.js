export default function view(page) {
  return function (resolve) {
    console.log(`@/pages/${page}.vue`)
    return import(`@/pages/${page}.vue`).then(s => {
      resolve(s.default);
    })
  }
}