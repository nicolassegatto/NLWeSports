import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { ModalAddAds } from './ModalAddAds';

export function CreateAdBanner() {
    return (
        <Dialog.Root>
            <div className='pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden'>
                <div className='bg-[#242634] px-8 py-6 rounded-lg flex justify-between items-center'>
                    <div>
                        <strong className='block text-2xl text-white font-black'>Não encontrou seu duo?</strong>
                        <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
                    </div>
                    <Dialog.Trigger className=' flex items-center gap-3 py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded'><MagnifyingGlassPlus size={24} />Publicar anúncio</Dialog.Trigger>
                    <ModalAddAds/>
                </div>
            </div>
        </Dialog.Root>
    )
}