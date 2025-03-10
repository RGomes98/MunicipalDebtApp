import { toast } from 'sonner';

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

type NotifyDialog = {
  dialogState: { value: boolean; set: (state: boolean) => void };
};

export function NotifyDialog({ dialogState }: NotifyDialog) {
  function handleConfirmAction() {
    dialogState.set(false);
    const MESSAGE = 'Um e-mail foi enviado ao setor de cobrança. Aguarde pela análise.';
    toast.success(<p className='text-xs'>{MESSAGE}</p>);
  }
  return (
    <AlertDialog open={dialogState.value}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-semibold'>Notificar setor de cobrança</AlertDialogTitle>
          <AlertDialogDescription className='text-stone-600'>
            Ao confirmar, o setor de cobrança será notificado sobre este caso para análise e possíveis
            providências. Tem certeza de que deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer' onClick={() => dialogState.set(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirmAction()} className='cursor-pointer'>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
