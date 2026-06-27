import Image from 'next/image';
import Link from 'next/link';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';

const Footer = () => (
  <Background color="bg-white">
    <Section yPadding="py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="border-t border-gray-300 pt-8 md:pt-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 ring-1 ring-gray-300">
                <Image
                  src="/assets/images/robotic.svg"
                  alt="Robotix.ID Logo"
                  width={42}
                  height={42}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="max-w-md">
                <h3 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                  Robotix.ID
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-700 sm:text-base">
                  Temukan berbagai produk teknologi, robotik, dan kebutuhan
                  edukasi untuk mendukung eksplorasi, pembelajaran, dan inovasi.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
              <Link
                href="https://robotix-id.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kunjungi Robotix.ID"
                className="hover:bg-primary-50 group inline-flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-900 transition duration-300 hover:border-primary-400 hover:text-primary-700 sm:w-auto"
              >
                <span>Kunjungi robotix-id.com</span>

                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4 transition duration-300 group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                Robotics · Education · Innovation
              </p>

              <div className="mt-1 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-end">
                <a
                  href="https://www.linkedin.com/company/robotix-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:text-blue-600"
                >
                  <span className="flex size-8 items-center justify-center rounded-full border border-blue-100 bg-blue-50 shadow-sm transition group-hover:scale-105 group-hover:bg-blue-100">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-blue-600"
                      fill="currentColor"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6 1.12 6 0 4.88 0 3.5S1.12 1 2.49 1c1.38 0 2.49 1.12 2.49 2.5zM.22 8.98h4.54V24H.22V8.98zM7.73 8.98h4.35v2.05h.06c.61-1.15 2.09-2.36 4.29-2.36 4.59 0 5.43 3.02 5.43 6.94V24h-4.54v-6.93c0-1.65-.03-3.78-2.3-3.78-2.3 0-2.65 1.8-2.65 3.66V24H7.73V8.98z" />
                    </svg>
                  </span>
                  <span className="tracking-tight">Follow us on LinkedIn</span>
                </a>

                <a
                  href="https://www.instagram.com/robotixid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-pink-200 hover:text-pink-600"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white shadow-[0_8px_20px_rgba(236,72,153,0.35)] transition group-hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="currentColor"
                    >
                      <path d="M7.75 2C4.68 2 2 4.68 2 7.75v8.5C2 19.32 4.68 22 7.75 22h8.5C19.32 22 22 19.32 22 16.25v-8.5C22 4.68 19.32 2 16.25 2h-8.5zM12 7.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2zm0 1.8A3 3 0 1 0 15 12 3 3 0 0 0 12 9zm5.4-2.1a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
                    </svg>
                  </span>

                  <span className="tracking-tight">See us on Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-gray-300 pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-sm text-gray-700">
              © {new Date().getFullYear()} Robotix.ID. All rights reserved.
            </p>

            <p className="text-sm text-gray-500">
              Designed for a smarter learning experience.
            </p>
          </div>
        </div>
      </div>
    </Section>
  </Background>
);

export { Footer };
