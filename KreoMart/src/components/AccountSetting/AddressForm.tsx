import React from 'react'

const AddressForm = (handleAddress: any) => {
  return (
    <div className='text-base p-4'>
        <form onSubmit={handleAddress}>
              <div className="">
                <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[2px]">
                      <label className="relative leading-[130%] mix-blend-normal">
                        Name
                      </label>
                      <div className="relative tracking-[-0.01em] font-regular-12-text-xs-allcaps text-red-default mix-blend-normal">
                        *
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-sm text-grey-scale-carbon-gray">
                      <div className="self-stretch bg-grey-scale-white box-border h-[52px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-grey-scale-chalk-gray">
                        <div className="flex-1 flex flex-row items-start justify-start">
                          <input
                            className="flex-1 relative leading-[130%] font-medium focus:outline-none"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[2px]">
                      <label className="relative leading-[130%] mix-blend-normal">
                        Phone
                      </label>
                      <label className="relative tracking-[-0.01em] font-regular-12-text-xs-allcaps text-red-default mix-blend-normal">
                        *
                      </label>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-sm text-grey-scale-carbon-gray">
                      <div className="self-stretch bg-grey-scale-white box-border h-[52px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-grey-scale-chalk-gray">
                        <div className="flex-1 flex flex-row items-start justify-start">
                          <input
                            className="flex-1 relative leading-[130%] font-medium focus:outline-none"
                            type="text"
                            placeholder="8652392200"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[2px]">
                    <label className="relative leading-[130%] mix-blend-normal">
                      Address line 1
                    </label>
                    <label className="relative tracking-[-0.01em] font-regular-12-text-xs-allcaps text-red-default mix-blend-normal">
                      *
                    </label>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start text-sm text-grey-scale-carbon-gray">
                    <div className="self-stretch bg-grey-scale-white box-border h-[52px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-grey-scale-chalk-gray">
                      <div className="flex-1 flex flex-row items-start justify-start">
                        <input
                          className="flex-1 relative leading-[130%] font-medium focus:outline-none"
                          placeholder=" Central railway colony"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[2px]">
                    <label className="relative leading-[130%] mix-blend-normal">
                      Address line 2
                    </label>
                    <label className="relative tracking-[-0.01em] font-regular-12-text-xs-allcaps text-red-default mix-blend-normal">
                      *
                    </label>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start text-sm text-grey-scale-carbon-gray">
                    <div className="self-stretch bg-grey-scale-white box-border h-[52px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-grey-scale-chalk-gray">
                      <div className="flex-1 flex flex-row items-start justify-start">
                        <input
                          className="flex-1 relative leading-[130%] font-medium focus:outline-none"
                          placeholder="MS/RB-2/123/4"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[2px]">
                    <label className="relative leading-[130%] mix-blend-normal">
                      State
                    </label>
                    <label className="relative tracking-[-0.01em] font-regular-12-text-xs-allcaps text-red-default mix-blend-normal">
                      *
                    </label>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start text-sm text-grey-scale-carbon-gray">
                    <div className="self-stretch bg-grey-scale-white box-border h-[52px] flex flex-row p-4 items-center justify-start gap-[12px] border-[1px] border-solid border-grey-scale-chalk-gray">
                      <div className="flex-1 flex flex-row items-start justify-start">
                        <input
                          className="flex-1 relative leading-[130%] font-medium focus:outline-none"
                          placeholder=" Maharashtra"
                          required
                          type="text"
                        />
                      </div>
                      <button>
                        <img
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/assets/Arrow Down.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[2px]">
                      <label className="relative leading-[130%] mix-blend-normal">
                        Town/City
                      </label>
                      <label className="relative tracking-[-0.01em] font-regular-12-text-xs-allcaps text-red-default mix-blend-normal">
                        *
                      </label>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-sm text-grey-scale-carbon-gray">
                      <div className="self-stretch bg-grey-scale-white box-border h-[52px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-grey-scale-chalk-gray">
                        <div className="flex-1 flex flex-row items-start justify-start">
                          <input
                            className="flex-1 relative leading-[130%] font-medium focus:outline-none"
                            placeholder=" Mumbai"
                            type="text"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[2px]">
                      <label className="relative leading-[130%] mix-blend-normal">
                        Pincode
                      </label>
                      <label className="relative tracking-[-0.01em] font-regular-12-text-xs-allcaps text-red-default mix-blend-normal">
                        *
                      </label>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-sm text-grey-scale-carbon-gray">
                      <div className="self-stretch bg-grey-scale-white box-border h-[52px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-grey-scale-chalk-gray">
                        <div className="flex-1 flex flex-row items-start justify-start">
                          <input
                            className="flex-1 relative leading-[130%] font-medium focus:outline-none"
                            placeholder="400019"
                            type="text"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[8px] text-sm text-grey-scale-carbon-gray">
                <div className="relative w-[18px] h-[18px]">
                  <div className="absolute h-[93.83%] w-[93.83%] top-[3.09%] right-[3.09%] bottom-[3.09%] left-[3.09%] box-border border-[0.9px] border-solid border-grey-scale-cool-gray" />
                </div>
                <div className="flex-1 relative leading-[130%] font-medium">
                  Use this as your default address
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px] text-center text-sm text-gray-default cursor-pointer">
                <div className="flex-1 flex flex-row py-4 px-6 items-center justify-center border-[1px] border-solid border-grey-scale-black-russian">
                  <button className="relative leading-[130%]">Cancel</button>
                </div>
                <div className="flex-1 bg-[#020044] flex flex-row py-4 px-6 items-center justify-center text-white cursor-pointer">
                  <button className="relative leading-[130%]" type="submit">
                    Save address
                  </button>
                </div>
              </div>
            </form>
    </div>
  )
}

export default AddressForm