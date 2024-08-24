// app/settings/page.tsx

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from '@/components/Header';
import { ModeToggle } from '@/components/theme';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('pt');
  const [showDialog, setShowDialog] = useState(false);

  const handleSave = () => {
    setShowDialog(true); // Mostra o diálogo de confirmação ao clicar em salvar
  };

  const confirmSave = () => {
    setShowDialog(false); // Fecha o diálogo
    alert('Configurações salvas com sucesso!');
    // Adicione aqui a lógica para salvar as configurações em um backend ou localStorage
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#202024] transition-colors">
        <div className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-800 rounded shadow-md transition-colors">
          <h1 className="text-2xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-4">
            Configurações do Sistema
          </h1>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 dark:text-white">Tema:</label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 dark:text-white">Notificações:</label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="ml-2"
            />
            <span className="ml-2 dark:text-white">Ativar Notificações</span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 dark:text-white">Idioma:</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">Inglês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ModeToggle />

          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogTrigger asChild>
              <Button
                onClick={handleSave}
                className="w-full p-2 font-semibold text-white bg-green-500"
              >
                Salvar Configurações
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmação de Salvar</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja salvar essas configurações? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowDialog(false)}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={confirmSave}>Salvar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
