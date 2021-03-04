export const dva = {
  config: {
    onError(e: { msg: string }) {
      console.error('error', e.msg)
    },
  },
}
