"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/utils/supabase/client";
import React from "react";
import { useState, useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(5, { message: "El campo título es requerido" }).trim(),
  message: z
    .string()
    .min(10, { message: "Mensaje al menos debe tener 10 caracteres" })
    .max(300, { message: "Mensaje máximo 250 caracteres" })
    .trim(),
  url: z.string().min(0).trim(),
});

type FormData = z.infer<typeof formSchema>;

const MAX_CHARS = 300;

export const GossipFormClient = ({
  ip,
  city,
  country,
  userName,
  fullName,
  avatar,
  onRefresh,
}: {
  ip?: string;
  city?: string;
  country?: string;
  userName: string;
  fullName?: string;
  avatar?: string;
  onRefresh: () => Promise<any>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (formData: FormData) => {
    const { error } = await supabase.from("gossip").insert([
      {
        ip: ip,
        city: city,
        country: country,
        title: formData.title,
        message: formData.message,
        url: formData.url,
        user_name: userName,
        full_name: fullName,
        avatar_url: avatar,
      },
    ]);

    if (error) {
      console.error("Failed to submit gossip:", error);
    }

    await onRefresh();

    reset();
  };

  const [charCount, setCharCount] = useState(MAX_CHARS);
  const [wordCount, setWordCount] = useState(0);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCharCount(MAX_CHARS - text.length);
    setWordCount(text.split(" ").length);
  };

  useEffect(() => {
    const resize = () => {
      const textarea = document.getElementById("textarea");
      textarea?.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      });
    };
    resize();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-[100%] my-20 gap-3 border-b border-foreground/10"
    >
      <section className="flex flex-col xl:max-w-xl max-w-[80%] justify-center mx-auto my-10">
        <h3 className="font-semibold ml-1 my-3">
          Que hay de nuevo {userName}?
        </h3>
        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 bg-transparent border-b"
          {...register("title")}
        />
        {errors.title && (
          <small className="error">{errors.title.message as string}</small>
        )}

        <textarea
          id="textarea"
          className="w-full p-2 bg-transparent resize-none border-b"
          placeholder="Contáte algo che..."
          {...register("message")}
          onInput={handleInput}
          maxLength={MAX_CHARS}
        ></textarea>
        <div className="text-xs ml-[6px] mt-2 space-x-2 text-zinc-400">
          {charCount < 10 ? (
            <>
              <span>
                Caracteres restantes:
                <span className="text-red-400 font-semibold"> {charCount}</span>
              </span>
              <span>Palabras: {wordCount}</span>
            </>
          ) : (
            <>
              <span>Caracteres restantes: {charCount}</span>
              <span>Palabras: {wordCount}</span>
            </>
          )}
        </div>
        {errors.message && (
          <small className="error">{errors.message.message as string}</small>
        )}

        <input
          type="text"
          placeholder="¿URL del artículo?"
          className="w-full p-2 bg-transparent border-b my-4"
          {...register("url")}
        />
        {errors.url && (
          <small className="error">{errors.url.message as string}</small>
        )}

        <div className="flex justify-end my-2">
          <button
            type="submit"
            className="px-2 py-1 bg-btn-background hover:bg-btn-background-hover rounded-lg border border-foreground/10 w-fit cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </section>
    </form>
  );
};
