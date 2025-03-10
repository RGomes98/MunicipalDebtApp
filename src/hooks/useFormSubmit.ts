import { FormEvent, useState } from 'react';

type FormEntries = { cpf: string; name: string } | null;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const TWO_SECONDS = 2000;

function useFormSubmit() {
  const [formEntries, setFormEntries] = useState<FormEntries>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { cpf, name } = Object.fromEntries(formData.entries());
    setFormEntries({ cpf: String(cpf), name: String(name) });
    await delay(TWO_SECONDS);
    setIsLoading(false);
  }

  return { isLoading, formEntries, handleSubmit };
}

export { useFormSubmit };
export type { FormEntries };
