import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fragment, useState } from 'react';
import { useDebtData } from '@/hooks/useDebtData';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useFilterQueryResult } from '@/hooks/useFilterResult';
import { DataTable } from '@/components/DataTable';
import { NotifyDialog } from '@/components/NotifyDialog';
import { QueryForm } from '@/components/QueryForm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QueryResult } from '@/components/QueryResult';

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogState = { value: isDialogOpen, set: setIsDialogOpen };

  const { isLoading, formEntries, handleSubmit } = useFormSubmit();
  const { columns, debtData } = useDebtData();
  const { userQueryResult, filteredDebtData } = useFilterQueryResult({
    formEntries,
    queryResult: debtData,
  });

  return (
    <Fragment>
      <div className='min-h-screen'>
        <header className='sticky top-0 z-50 bg-blue-600 p-4 text-white shadow-md'>
          <Header />
        </header>

        <main className='mx-auto px-8 pt-10 pb-16 max-sm:px-4'>
          <Card className='py-5'>
            <CardHeader>
              <CardTitle className='text-2xl max-sm:text-xl'>Formulário de Consulta</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryForm isLoading={isLoading} onSubmit={handleSubmit} />
            </CardContent>
          </Card>

          <Card className='mt-8 py-5'>
            <CardHeader>
              <CardTitle className='text-2xl max-sm:text-xl'>Resultados da Consulta</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryResult
                isLoading={isLoading}
                formEntries={formEntries}
                dialogState={dialogState}
                queryResult={userQueryResult}
              />
            </CardContent>
          </Card>

          <Card className='mt-8 py-5'>
            <CardHeader>
              <CardTitle className='text-2xl max-sm:text-xl'>Lista de Dívidas Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={filteredDebtData} columns={columns} />
            </CardContent>
          </Card>
        </main>

        <footer className='flex items-center justify-center bg-blue-600 py-3 text-white shadow-md'>
          <Footer />
        </footer>
      </div>
      <NotifyDialog dialogState={dialogState} />
    </Fragment>
  );
}
