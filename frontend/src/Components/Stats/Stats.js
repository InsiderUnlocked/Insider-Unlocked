import React from "react";
import "./Stats.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Stats({ loading, totalAssets, name }) {
  return (
    <div class="bg-gray-900">
      {/* Name of Data Table */}
      <header className="">
        <div className="break-normal flex justify-center px-4 py-4 mx-auto text-center h-12">
          {/* <h1 className="text-3xl font-bold text-white">{name}</h1> */}
        </div>
      </header>

      {/* Stats Cards */}
      <div class="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3 mx-auto">
        {/* Card 1 */}
        <div class="min-w-0 rounded-xl overflow-hidden bg-gray-800 border-gray shadow">
          <div class="p-4 flex items-center self-center h-32">
            {/* Card Icon */}
            <div class="align-middle p-3 rounded-full bg-gradient-to-b from-green-300 via-blue-300 to-purple-800 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="black"
                class="bi bi-currency-dollar"
                viewBox="0 0 16 16"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
              </svg>
            </div>

            {/* Card Content */}
            <div className="mx-5 inline-block align-middle">
              <p class="mb-2 text-sm font-medium text-white">AVG. MARKET CAP</p>
              {loading ? (
                <SkeletonTheme baseColor="#3d3d3d" highlightColor="#2e2e2e">
                  <Skeleton height={25} width={133} />
                </SkeletonTheme>
              ) : (
                <p class="text-lg font-semibold text-white">$ --</p>
              )}
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div class="min-w-0 rounded-xl overflow-hidden bg-gray-800 border-gray shadow">
          <div class="p-4 flex items-center self-center h-32">
            {/* Card Icon */}
            <div class="align-middle p-3 rounded-full bg-gradient-to-b from-green-300 via-blue-300 to-purple-800 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="black"
                class="bi bi-currency-dollar"
                viewBox="0 0 16 16"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
              </svg>
            </div>

            {/* Card Content */}
            <div className="mx-5 inline-block align-middle">
              <p class="mb-2 text-sm font-medium text-white">AVG. 24H %</p>
              {loading ? (
                <SkeletonTheme baseColor="#3d3d3d" highlightColor="#2e2e2e">
                  <Skeleton height={25} width={133} />
                </SkeletonTheme>
              ) : (
                <p class="text-lg font-semibold text-white">$ --</p>
              )}
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div class="min-w-0 rounded-xl overflow-hidden bg-gray-800 border-gray shadow">
          <div class="p-4 flex items-center self-center h-32">
            {/* Card Icon */}
            <div class="align-middle p-3 rounded-full bg-gradient-to-b from-green-300 via-blue-300 to-purple-800 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="black"
                class="bi bi-currency-dollar"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                />
              </svg>
            </div>

            {/* Card Content */}
            <div className="mx-5 inline-block align-middle">
              <p class="mb-2 text-sm font-medium text-white">
                NUMBER OF ASSETS
              </p>
              {loading ? (
                <SkeletonTheme
                  className="text-lg"
                  baseColor="#3d3d3d"
                  highlightColor="#2e2e2e"
                >
                  <Skeleton height={25} width={133} />
                </SkeletonTheme>
              ) : (
                <p class="text-lg font-semibold text-white">{totalAssets}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;