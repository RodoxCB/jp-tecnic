"use client";

import { useState } from "react";
import type {
  DifferentialItem,
  FaqItem,
  GalleryItem,
  PhoneBrand,
  PhoneItem,
  ReviewItem,
  ServiceItem,
  SiteContent,
  StepItem
} from "@/lib/types";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageField } from "@/components/admin/ImageField";

const TABS = [
  { id: "geral", label: "Geral" },
  { id: "galeria", label: "Galeria" },
  { id: "loja", label: "Loja" },
  { id: "conteudo", label: "Conteúdo" }
] as const;

type TabId = (typeof TABS)[number]["id"];

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#25D366]";

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-300">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

type AdminDashboardProps = {
  initialContent: SiteContent;
};

const BRAND_OPTIONS: { value: PhoneBrand; label: string }[] = [
  { value: "apple", label: "Apple" },
  { value: "samsung", label: "Samsung" },
  { value: "motorola", label: "Motorola" },
  { value: "xiaomi", label: "Xiaomi" },
  { value: "outros", label: "Outros" }
];

export function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState<TabId>("geral");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((previous) => ({ ...previous, [key]: value }));
  }

  function updateArray<T>(key: keyof SiteContent, value: T[]) {
    setContent((previous) => ({ ...previous, [key]: value } as SiteContent));
  }

  async function saveContentChanges() {
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    setSaving(false);
    setMessage(response.ok ? "Alterações salvas com sucesso." : "Não foi possível salvar agora.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function uploadGallery(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name.replace(/\.[^.]+$/, ""));

    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = (await response.json()) as { item: GalleryItem };
      updateArray("gallery", [data.item, ...content.gallery]);
      setMessage("Imagem adicionada na galeria.");
    } else {
      setMessage("Erro ao enviar imagem para galeria.");
    }

    setUploading(false);
    event.target.value = "";
  }

  async function deleteGalleryItem(id: string) {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    updateArray(
      "gallery",
      content.gallery.filter((item) => item.id !== id)
    );
    setMessage("Imagem removida da galeria.");
  }

  function addService() {
    const item: ServiceItem = {
      icon: "smartphone",
      title: "Novo serviço",
      description: "Descreva o serviço aqui."
    };

    updateArray("services", [...content.services, item]);
  }

  function addStep() {
    const item: StepItem = {
      step: content.steps.length + 1,
      title: "Novo passo",
      description: "Descreva esse passo do atendimento."
    };

    updateArray("steps", [...content.steps, item]);
  }

  function addDifferential() {
    const item: DifferentialItem = {
      icon: "zap",
      title: "Novo diferencial",
      description: "Explique o diferencial da JP Assistência Técnica."
    };

    updateArray("differentials", [...content.differentials, item]);
  }

  function addReview() {
    const item: ReviewItem = {
      name: "Cliente",
      location: "Cidade",
      text: "Conte aqui o depoimento."
    };

    updateArray("reviews", [...content.reviews, item]);
  }

  function addFaq() {
    const item: FaqItem = {
      question: "Nova pergunta",
      answer: "Resposta da pergunta."
    };

    updateArray("faq", [...content.faq, item]);
  }

  function addPhone() {
    const item: PhoneItem = {
      id: String(Date.now()),
      brand: "outros",
      model: "Novo aparelho",
      storage: "128GB",
      color: "Preto",
      condition: "Seminovo",
      price: "R$ 0,00",
      description: "Descreva o aparelho.",
      image: "",
      active: true
    };

    updateArray("phones", [item, ...content.phones]);
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Painel administrativo {content.site.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">Edite textos, galeria e aparelhos da loja.</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={saveContentChanges}
                disabled={saving}
                className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#20bd5a] disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500"
              >
                Sair
              </button>
            </div>
          </div>

          {message && (
            <p className="mt-3 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-2 text-sm text-[#25D366]">
              {message}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  tab === item.id
                    ? "bg-[#25D366] text-black"
                    : "border border-zinc-700 text-zinc-300 hover:border-[#25D366]/50 hover:text-[#25D366]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          {tab === "geral" && (
            <>
              <AdminSection title="Informações principais do site">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nome da empresa">
                    <input
                      className={inputClass}
                      value={content.site.name}
                      onChange={(event) =>
                        update("site", { ...content.site, name: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="Tagline">
                    <input
                      className={inputClass}
                      value={content.site.tagline}
                      onChange={(event) =>
                        update("site", { ...content.site, tagline: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="Instagram">
                    <input
                      className={inputClass}
                      value={content.site.instagram}
                      onChange={(event) =>
                        update("site", { ...content.site, instagram: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="Horário de atendimento">
                    <input
                      className={inputClass}
                      value={content.site.schedule}
                      onChange={(event) =>
                        update("site", { ...content.site, schedule: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="WhatsApp (com DDI)">
                    <input
                      className={inputClass}
                      value={content.contact.whatsappNumber}
                      onChange={(event) =>
                        update("contact", {
                          ...content.contact,
                          whatsappNumber: event.target.value
                        })
                      }
                    />
                  </Field>
                  <Field label="Mensagem padrão do WhatsApp">
                    <input
                      className={inputClass}
                      value={content.contact.whatsappMessage}
                      onChange={(event) =>
                        update("contact", {
                          ...content.contact,
                          whatsappMessage: event.target.value
                        })
                      }
                    />
                  </Field>
                </div>
              </AdminSection>

              <AdminSection title="Regiões atendidas" description="Uma linha por região.">
                <textarea
                  rows={5}
                  className={inputClass}
                  value={content.regions.join("\n")}
                  onChange={(event) =>
                    update(
                      "regions",
                      event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </AdminSection>
            </>
          )}

          {tab === "galeria" && (
            <AdminSection
              title="Galeria de trabalhos"
              description="Faça upload rápido ou ajuste manualmente links e textos da galeria."
            >
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black hover:bg-[#20bd5a]">
                {uploading ? "Enviando..." : "Adicionar foto"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={uploadGallery}
                />
              </label>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {content.gallery.map((item, index) => (
                  <div key={item.id} className="rounded-xl border border-zinc-800 bg-black/40 p-4">
                    <ImageField
                      label={`Imagem ${index + 1}`}
                      value={item.url}
                      folder="gallery"
                      onChange={(url) => {
                        const next = [...content.gallery];
                        next[index] = { ...item, url };
                        updateArray("gallery", next);
                      }}
                    />
                    <input
                      className={`${inputClass} mt-3`}
                      value={item.title}
                      placeholder="Legenda"
                      onChange={(event) => {
                        const next = [...content.gallery];
                        next[index] = { ...item, title: event.target.value };
                        updateArray("gallery", next);
                      }}
                    />
                    <input
                      className={`${inputClass} mt-2`}
                      value={item.permalink}
                      placeholder="Link do Instagram"
                      onChange={(event) => {
                        const next = [...content.gallery];
                        next[index] = { ...item, permalink: event.target.value };
                        updateArray("gallery", next);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => deleteGalleryItem(item.id)}
                      className="mt-2 text-sm text-red-400 hover:text-red-300"
                    >
                      Remover imagem
                    </button>
                  </div>
                ))}
              </div>
            </AdminSection>
          )}

          {tab === "loja" && (
            <AdminSection title="Loja de celulares" description="Gerencie os aparelhos exibidos na página /loja.">
              <button
                type="button"
                onClick={addPhone}
                className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black hover:bg-[#20bd5a]"
              >
                Adicionar aparelho
              </button>

              <div className="mt-6 space-y-4">
                {content.phones.map((phone, index) => (
                  <div key={phone.id} className="rounded-xl border border-zinc-800 bg-black/40 p-4">
                    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                      <ImageField
                        label="Imagem do aparelho"
                        value={phone.image}
                        folder="loja"
                        onChange={(url) => {
                          const next = [...content.phones];
                          next[index] = { ...phone, image: url };
                          updateArray("phones", next);
                        }}
                      />
                      <div className="grid gap-2 md:grid-cols-2">
                        <input
                          className={inputClass}
                          value={phone.model}
                          placeholder="Modelo"
                          onChange={(event) => {
                            const next = [...content.phones];
                            next[index] = { ...phone, model: event.target.value };
                            updateArray("phones", next);
                          }}
                        />
                        <select
                          className={inputClass}
                          value={phone.brand}
                          onChange={(event) => {
                            const next = [...content.phones];
                            next[index] = {
                              ...phone,
                              brand: event.target.value as PhoneBrand
                            };
                            updateArray("phones", next);
                          }}
                        >
                          {BRAND_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <input
                          className={inputClass}
                          value={phone.storage}
                          placeholder="Armazenamento"
                          onChange={(event) => {
                            const next = [...content.phones];
                            next[index] = { ...phone, storage: event.target.value };
                            updateArray("phones", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={phone.color}
                          placeholder="Cor"
                          onChange={(event) => {
                            const next = [...content.phones];
                            next[index] = { ...phone, color: event.target.value };
                            updateArray("phones", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={phone.condition}
                          placeholder="Condição"
                          onChange={(event) => {
                            const next = [...content.phones];
                            next[index] = { ...phone, condition: event.target.value };
                            updateArray("phones", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={phone.price}
                          placeholder="Preço"
                          onChange={(event) => {
                            const next = [...content.phones];
                            next[index] = { ...phone, price: event.target.value };
                            updateArray("phones", next);
                          }}
                        />
                        <textarea
                          rows={2}
                          className="md:col-span-2 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#25D366]"
                          value={phone.description}
                          placeholder="Descrição"
                          onChange={(event) => {
                            const next = [...content.phones];
                            next[index] = { ...phone, description: event.target.value };
                            updateArray("phones", next);
                          }}
                        />
                        <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
                          <input
                            type="checkbox"
                            checked={phone.active}
                            onChange={(event) => {
                              const next = [...content.phones];
                              next[index] = { ...phone, active: event.target.checked };
                              updateArray("phones", next);
                            }}
                          />
                          Aparelho ativo na loja
                        </label>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateArray(
                          "phones",
                          content.phones.filter((_, phoneIndex) => phoneIndex !== index)
                        )
                      }
                      className="mt-3 text-sm text-red-400 hover:text-red-300"
                    >
                      Remover aparelho
                    </button>
                  </div>
                ))}
              </div>
            </AdminSection>
          )}

          {tab === "conteudo" && (
            <>
              <AdminSection title="Serviços">
                <button
                  type="button"
                  onClick={addService}
                  className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black hover:bg-[#20bd5a]"
                >
                  Adicionar serviço
                </button>
                <div className="mt-4 space-y-3">
                  {content.services.map((service, index) => (
                    <div key={`${service.title}-${index}`} className="rounded-lg border border-zinc-800 p-3">
                      <div className="grid gap-2 md:grid-cols-3">
                        <input
                          className={inputClass}
                          value={service.icon}
                          placeholder="Ícone"
                          onChange={(event) => {
                            const next = [...content.services];
                            next[index] = { ...service, icon: event.target.value };
                            updateArray("services", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={service.title}
                          placeholder="Título"
                          onChange={(event) => {
                            const next = [...content.services];
                            next[index] = { ...service, title: event.target.value };
                            updateArray("services", next);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateArray(
                              "services",
                              content.services.filter((_, serviceIndex) => serviceIndex !== index)
                            )
                          }
                          className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
                        >
                          Remover
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        className={`${inputClass} mt-2`}
                        value={service.description}
                        onChange={(event) => {
                          const next = [...content.services];
                          next[index] = { ...service, description: event.target.value };
                          updateArray("services", next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection title="Passos de atendimento">
                <button
                  type="button"
                  onClick={addStep}
                  className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black hover:bg-[#20bd5a]"
                >
                  Adicionar passo
                </button>
                <div className="mt-4 space-y-3">
                  {content.steps.map((step, index) => (
                    <div key={`${step.title}-${index}`} className="rounded-lg border border-zinc-800 p-3">
                      <div className="grid gap-2 md:grid-cols-3">
                        <input
                          className={inputClass}
                          type="number"
                          value={step.step}
                          onChange={(event) => {
                            const next = [...content.steps];
                            next[index] = { ...step, step: Number(event.target.value) };
                            updateArray("steps", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={step.title}
                          onChange={(event) => {
                            const next = [...content.steps];
                            next[index] = { ...step, title: event.target.value };
                            updateArray("steps", next);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateArray(
                              "steps",
                              content.steps.filter((_, stepIndex) => stepIndex !== index)
                            )
                          }
                          className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
                        >
                          Remover
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        className={`${inputClass} mt-2`}
                        value={step.description}
                        onChange={(event) => {
                          const next = [...content.steps];
                          next[index] = { ...step, description: event.target.value };
                          updateArray("steps", next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection title="Diferenciais">
                <button
                  type="button"
                  onClick={addDifferential}
                  className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black hover:bg-[#20bd5a]"
                >
                  Adicionar diferencial
                </button>
                <div className="mt-4 space-y-3">
                  {content.differentials.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="rounded-lg border border-zinc-800 p-3">
                      <div className="grid gap-2 md:grid-cols-3">
                        <input
                          className={inputClass}
                          value={item.icon}
                          onChange={(event) => {
                            const next = [...content.differentials];
                            next[index] = { ...item, icon: event.target.value };
                            updateArray("differentials", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={item.title}
                          onChange={(event) => {
                            const next = [...content.differentials];
                            next[index] = { ...item, title: event.target.value };
                            updateArray("differentials", next);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateArray(
                              "differentials",
                              content.differentials.filter((_, differentialIndex) => differentialIndex !== index)
                            )
                          }
                          className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
                        >
                          Remover
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        className={`${inputClass} mt-2`}
                        value={item.description}
                        onChange={(event) => {
                          const next = [...content.differentials];
                          next[index] = { ...item, description: event.target.value };
                          updateArray("differentials", next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection title="Avaliações">
                <button
                  type="button"
                  onClick={addReview}
                  className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black hover:bg-[#20bd5a]"
                >
                  Adicionar avaliação
                </button>
                <div className="mt-4 space-y-3">
                  {content.reviews.map((review, index) => (
                    <div key={`${review.name}-${index}`} className="rounded-lg border border-zinc-800 p-3">
                      <div className="grid gap-2 md:grid-cols-3">
                        <input
                          className={inputClass}
                          value={review.name}
                          onChange={(event) => {
                            const next = [...content.reviews];
                            next[index] = { ...review, name: event.target.value };
                            updateArray("reviews", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={review.location}
                          onChange={(event) => {
                            const next = [...content.reviews];
                            next[index] = { ...review, location: event.target.value };
                            updateArray("reviews", next);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateArray(
                              "reviews",
                              content.reviews.filter((_, reviewIndex) => reviewIndex !== index)
                            )
                          }
                          className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
                        >
                          Remover
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        className={`${inputClass} mt-2`}
                        value={review.text}
                        onChange={(event) => {
                          const next = [...content.reviews];
                          next[index] = { ...review, text: event.target.value };
                          updateArray("reviews", next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection title="Perguntas frequentes">
                <button
                  type="button"
                  onClick={addFaq}
                  className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black hover:bg-[#20bd5a]"
                >
                  Adicionar pergunta
                </button>
                <div className="mt-4 space-y-3">
                  {content.faq.map((item, index) => (
                    <div key={`${item.question}-${index}`} className="rounded-lg border border-zinc-800 p-3">
                      <input
                        className={inputClass}
                        value={item.question}
                        onChange={(event) => {
                          const next = [...content.faq];
                          next[index] = { ...item, question: event.target.value };
                          updateArray("faq", next);
                        }}
                      />
                      <textarea
                        rows={2}
                        className={`${inputClass} mt-2`}
                        value={item.answer}
                        onChange={(event) => {
                          const next = [...content.faq];
                          next[index] = { ...item, answer: event.target.value };
                          updateArray("faq", next);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateArray(
                            "faq",
                            content.faq.filter((_, faqIndex) => faqIndex !== index)
                          )
                        }
                        className="mt-2 text-sm text-red-400 hover:text-red-300"
                      >
                        Remover pergunta
                      </button>
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection title="Textos do site" description="Ajuste os blocos de copy em um único lugar.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Badge do hero">
                    <input
                      className={inputClass}
                      value={content.copy.hero.badge}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          hero: { ...content.copy.hero, badge: event.target.value }
                        })
                      }
                    />
                  </Field>
                  <Field label="Título hero">
                    <input
                      className={inputClass}
                      value={content.copy.hero.title}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          hero: { ...content.copy.hero, title: event.target.value }
                        })
                      }
                    />
                  </Field>
                  <Field label="Destaque hero">
                    <input
                      className={inputClass}
                      value={content.copy.hero.titleHighlight}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          hero: { ...content.copy.hero, titleHighlight: event.target.value }
                        })
                      }
                    />
                  </Field>
                  <Field label="CTA galeria no hero">
                    <input
                      className={inputClass}
                      value={content.copy.hero.ctaGallery}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          hero: { ...content.copy.hero, ctaGallery: event.target.value }
                        })
                      }
                    />
                  </Field>
                  <Field label="Título seção serviços">
                    <input
                      className={inputClass}
                      value={content.copy.services.title}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          services: { ...content.copy.services, title: event.target.value }
                        })
                      }
                    />
                  </Field>
                  <Field label="CTA seção serviços">
                    <input
                      className={inputClass}
                      value={content.copy.services.cta}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          services: { ...content.copy.services, cta: event.target.value }
                        })
                      }
                    />
                  </Field>
                  <Field label="Título seção loja">
                    <input
                      className={inputClass}
                      value={content.copy.loja.title}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          loja: { ...content.copy.loja, title: event.target.value }
                        })
                      }
                    />
                  </Field>
                  <Field label="CTA da loja">
                    <input
                      className={inputClass}
                      value={content.copy.loja.cta}
                      onChange={(event) =>
                        update("copy", {
                          ...content.copy,
                          loja: { ...content.copy.loja, cta: event.target.value }
                        })
                      }
                    />
                  </Field>
                </div>
              </AdminSection>
            </>
          )}
        </div>

        <div className="mt-10 flex justify-end border-t border-zinc-800 pt-6">
          <button
            type="button"
            onClick={saveContentChanges}
            disabled={saving}
            className="rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#20bd5a] disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
