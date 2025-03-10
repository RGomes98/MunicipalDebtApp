import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type FormEntries = { cpf: string; name: string } | null;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const TWO_SECONDS = 2000;

function useFormSubmit() {
  const [formEntries, setFormEntries] = useState<FormEntries>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());
    const isFormEmpty = Object.values(formEntries).every((entry) => !String(entry).trim());

    if (isFormEmpty) {
      toast.warning(<p className='text-xs'>Preencha ao menos um campo para poder continuar.</p>);
      return;
    }

    setIsLoading(true);
    const { cpf, name } = formEntries;
    setFormEntries({ cpf: String(cpf), name: String(name) });
    await delay(TWO_SECONDS);
    setIsLoading(false);
  }

  return { isLoading, formEntries, handleSubmit };
}

export { useFormSubmit };
export type { FormEntries };
