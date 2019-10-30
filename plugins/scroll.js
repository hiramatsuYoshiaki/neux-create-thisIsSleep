import Vue from 'vue'

// Vue.directive('scroll', {
//   inserted: (el, binding) => {
//     const f = (evt) => {
//       if (binding.value(evt, el)) {
//         window.removeEventListener('scroll', f)
//       }
//     }
//     window.addEventListener('scroll', f)
//   }
// })
Vue.directive('scroll', {
  inserted: (el, binding) => {
    const f = (evt) => {
      const arg = binding.arg ? binding.arg : 0
      if (binding.value(evt, el, arg)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
