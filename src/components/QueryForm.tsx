import { FormEvent, useState } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';

type QueryForm = {
  isLoading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const formatCPF = (input: string) => {
  const CPF = input.replace(/[^0-9xX]/g, '');
  let formattedCPF = '';

  if (CPF.length <= 3) {
    formattedCPF = CPF;
  } else if (CPF.length <= 6) {
    formattedCPF = `${CPF.slice(0, 3)}.${CPF.slice(3)}`;
  } else if (CPF.length <= 9) {
    formattedCPF = `${CPF.slice(0, 3)}.${CPF.slice(3, 6)}.${CPF.slice(6)}`;
  } else {
    formattedCPF = `${CPF.slice(0, 3)}.${CPF.slice(3, 6)}.${CPF.slice(6, 9)}-${CPF.slice(9)}`;
  }

  return formattedCPF.toUpperCase();
};

export function QueryForm({ isLoading, onSubmit }: QueryForm) {
  const [input, setInput] = useState('');

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='rg'>Nome (opcional)</Label>
        <Input name='name' placeholder='João da Silva' />
      </div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='cpf'>CPF (obrigatório)</Label>
        <Input
          value={input}
          required
          maxLength={14}
          name='cpf'
          placeholder='000.000.000-00'
          onChange={(event) => setInput(formatCPF(event.target.value))}
        />
      </div>
      <Button disabled={isLoading} className='cursor-pointer'>
        {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Buscar'}
      </Button>
    </form>
  );
}
