import { useState } from "react";

const Chart = () => {
  const [selected_option, set_selected_option] = useState("last_7_days");
  const [is_open, set_is_open] = useState(false);
  const select_options = [
    { value: "last_7_days", label: "Last 7 days" },
    { value: "last_30_days", label: "Last 30 days" },
  ];
  return (
    <div className="py-4 px-4 sm:px-8 rounded-xl bg-neutral-subtle">
      <div className="flex items-center justify-between gap-5">
        <h5 className="text-text-body text-headline leading-headline">Orders</h5>

        <div className="relative">
          <button
            onClick={() => set_is_open(!is_open)}
            className="flex items-center justify-center gap-2.5 px-3.75 py-2 rounded-full border border-primary text-primary text-caption leading-caption"
          >
            <h6>{select_options.find((option) => option.value === selected_option)?.label}</h6>

            <svg className="w-3 h-1.75" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <path
                id="Vector"
                d="M5.29 6.7C5.68 7.09 6.31 7.09 6.7 6.7L11.7 1.7C12.09 1.31 12.09 0.68 11.7 0.29C11.31 -0.1 10.68 -0.1 10.29 0.29L6 4.58L1.7 0.29C1.31 -0.1 0.68 -0.1 0.29 0.29C-0.1 0.68 -0.1 1.32 0.29 1.71L5.29 6.71L5.29 6.7Z"
                fill="#5D17EA"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
            </svg>
          </button>

          <div
            className={`absolute top-12 left-0 w-max bg-white border border-neutral-default rounded-xl shadow-lg transition-all duration-300 ${
              is_open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <ul className="flex flex-col gap-2.5 p-3">
              {select_options.map((option) => (
                <li key={option.value}>
                  <button
                    onClick={() => {
                      set_selected_option(option.value);
                      set_is_open(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      selected_option === option.value ? "bg-primary text-white" : "text-text-body"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="flex flex-col items-center justify-center mt-6 rounded-lg h-[calc(100%-5rem)]">
        <div className="p-4 w-full h-full rounded-lg bg-primary/5 border border-primary/20 flex flex-col items-center justify-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-primary opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 21H4.6C4.1 21 3.7 20.6 3.7 20.1V3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 8L7 10.5L9 13L7 15.5L9 18" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 7V18" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 10.5V18" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h4 className="text-primary text-xl font-medium mb-1">Chart Coming Soon</h4>
        </div>
      </div>
    </div>
  );
};

export default Chart;
