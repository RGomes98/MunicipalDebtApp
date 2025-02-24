import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

const mockHistory = [
  { date: '2023-06-01T10:30:00Z', cpf: '123.***.***-00', name: 'Maria Silva', result: 'Falecido' },
  { date: '2023-06-02T14:45:00Z', cpf: '456.***.***-11', name: 'João Santos', result: 'Não encontrado' },
  { date: '2023-06-03T09:15:00Z', cpf: '789.***.***-22', name: 'Ana Oliveira', result: 'Falecido' },
  { date: '2023-06-04T16:20:00Z', cpf: '321.***.***-33', name: 'Carlos Ferreira', result: 'Não encontrado' },
  { date: '2023-06-05T11:00:00Z', cpf: '654.***.***-44', name: 'Beatriz Lima', result: 'Falecido' },
];

const mockResult = {
  isDeceased: true,
  name: 'Maria Silva',
  dateOfDeath: '2023-05-15',
  hasDebts: true,
  debts: [
    { type: 'IPTU', amount: 1500.0, dueDate: '2023-03-10', status: 'Vencida' },
    { type: 'Coleta de Lixo', amount: 200.0, dueDate: '2023-06-20', status: 'Aberta' },
  ],
};

export function Prototype() {
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(mockResult);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(mockHistory);
  const [highContrast, setHighContrast] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = async () => {
    if (!cpf) {
      setError('O CPF é obrigatório');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 1000);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-gray-100'}`}>
      <header className='sticky top-0 bg-blue-600 p-4 text-white shadow-md'>
        <div className='container mx-auto flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Consulta de Óbito e Verificação de Dívidas</h1>
            <p className='mt-2'>
              Verifique se uma pessoa falecida está registrada no banco de dados da cidade e se há pendências
              financeiras associadas ao seu CPF.
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Switch
              className='cursor-pointer'
              id='high-contrast'
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
            <Label htmlFor='high-contrast' className='text-white'>
              Alto Contraste
            </Label>
          </div>
        </div>
      </header>

      <main className='mx-auto px-8 pt-10 pb-16'>
        <Card>
          <CardHeader>
            <CardTitle>Formulário de Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
              <div className='flex flex-col gap-4'>
                <Label htmlFor='cpf'>CPF (obrigatório)</Label>
                <Input
                  id='cpf'
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  placeholder='000.000.000-00'
                  maxLength={14}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <Label htmlFor='rg'>RG (opcional)</Label>
                <Input
                  id='rg'
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                  placeholder='00.000.000-0'
                />
              </div>
              <Button className='cursor-pointer' onClick={handleSearch} disabled={loading}>
                {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Pesquisar'}
              </Button>
            </form>
            {error && (
              <div className='mt-4 flex items-center rounded bg-red-100 p-2 text-red-700'>
                <AlertCircle className='mr-2' />
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='mt-8'>
          <CardHeader>
            <CardTitle> Resultados da Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            {result.isDeceased ? (
              <div>
                <h3 className='text-xl font-semibold'>{result.name}</h3>
                <p>Data do Óbito: {new Date(result.dateOfDeath).toLocaleDateString()}</p>
                {result.hasDebts ? (
                  <div className='mt-4'>
                    <h4 className='text-lg font-semibold'>Dívidas Pendentes</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Data de Vencimento</TableHead>
                          <TableHead>Situação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.debts.map((debt, index) => (
                          <TableRow key={index}>
                            <TableCell>{debt.type}</TableCell>
                            <TableCell>R$ {debt.amount.toFixed(2)}</TableCell>
                            <TableCell>{new Date(debt.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{debt.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className='mt-4 space-x-4'>
                      <Button onClick={() => setIsDialogOpen(true)} className='cursor-pointer'>
                        Notificar Setor de Cobrança
                      </Button>
                      <Button onClick={print} className='cursor-pointer' variant='outline'>
                        Gerar Relatório
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className='mt-4 flex items-center text-green-600'>
                    <CheckCircle className='mr-2' /> Nenhuma dívida pendente encontrada.
                  </p>
                )}
              </div>
            ) : (
              <p>Nenhum registro de óbito encontrado para o CPF informado.</p>
            )}
          </CardContent>
        </Card>

        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Histórico de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Resultado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                    <TableCell>{entry.cpf}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {history.length > 0 && (
              <Button onClick={clearHistory} variant='outline' className='mt-4 cursor-pointer'>
                Limpar Histórico
              </Button>
            )}
          </CardContent>
        </Card>
        <AlertDialog open={isDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='font-semibold'>Notificar setor de cobrança</AlertDialogTitle>
              <AlertDialogDescription className='font-normal'>
                Ao confirmar, o setor de cobrança será notificado sobre este caso para análise e possíveis
                providências. Tem certeza de que deseja continuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className='cursor-pointer' onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction className='cursor-pointer'>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
