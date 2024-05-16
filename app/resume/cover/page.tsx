"use client";

import { useForm } from "react-hook-form";
import { useMemo } from "react";
import Link from "next/link";

import { twMerge as cs } from "tailwind-merge";

function Spacer({ className }: { className?: string }) {
  return <div className={cs("h-px w-full bg-black mb-6", className)} />;
}

export default function CoverLetterPage() {
  const form = useForm();
  const { phone, body } = form.watch();

  function onSubmit() {
    window.print();
  }

  const date = useMemo(
    () =>
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const bodyParts = useMemo(
    () => (body?.split("\n").filter(Boolean) ?? []) as string[],
    [body]
  );

  return (
    <main className="resume">
      <div className="pt-4 px-4 pb-40 max-w-3xl mx-auto">
        <div className="print:hidden mb-6">
          <Link
            href="/"
            className="block font-mono text-sm mb-4 hover:underline print:hidden"
          >
            ../
          </Link>
          <div className="space-y-4 mb-6">
            <p className="text-2xl font-medium">
              Use this to create a cover letter
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <label className="block">
                <span>Phone Number</span>
                <input
                  type="tel"
                  className="mt-1 block w-full"
                  placeholder="+1 (800) 588-2300"
                  {...form.register("phone")}
                />
              </label>
              <label className="block pb-2">
                <span>Cover Letter Body</span>
                <textarea
                  className="mt-1 block w-full whitespace-pre-line"
                  placeholder="PLS HIRE ME :)"
                  {...form.register("body")}
                />
              </label>
              <button
                type="submit"
                className="bg-black text-white hover:bg-gray-700 py-2 px-4"
              >
                Print
              </button>
            </form>
          </div>
          <Spacer />
        </div>
        <div>
          <h1 className="text-3xl font-display font-semibold">Hunter Lovell</h1>
          <span className="block my-1" />
          <div>{phone}</div>
          <div>hunter@hntrl.io</div>
          <span className="block my-4" />
          <div>{date}</div>
          <span className="block my-4" />
          <div className="space-y-3">
            {bodyParts.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            <div className="pt-3">
              Best,
              <br />
              Hunter Lovell
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
