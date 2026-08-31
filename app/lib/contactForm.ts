export type ContactFormStatus = "idle" | "sending" | "success" | "error";

const CONTACT_ENDPOINT = "https://byteconectividad.com.ar/api/contact.php";

export async function submitContactForm(
  form: HTMLFormElement,
  formType: "contact" | "service-request",
  startedAt: number,
) {
  const payload = new FormData(form);
  payload.set("formType", formType);
  payload.set("startedAt", String(startedAt));

  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    body: payload,
    headers: { Accept: "application/json" },
  });

  const result = (await response.json().catch(() => null)) as
    | { ok?: boolean; message?: string }
    | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.message || "No pudimos enviar tu consulta. Intentá nuevamente.");
  }

  return result;
}