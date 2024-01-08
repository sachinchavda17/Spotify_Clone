import { Icon } from "@iconify/react"


const Loading = () => {
  return (
    <div className="flex justify-center  items-center  py-20 mx-auto h-full " >
        {/* <div className="text-white text-xl">Loading...</div> */}
      <Icon icon="eos-icons:three-dots-loading" color="#eee" width="150" height="150" />
    </div>
  )
}

export default Loading
