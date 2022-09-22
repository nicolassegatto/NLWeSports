import { useState, useEffect, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CaretDown, Check, GameController, NumberEight } from 'phosphor-react';
import { Input } from './Input';
import axios from 'axios';
/* feito com https://www.radix-ui.com/docs/primitives/components/dialog */

interface GameList {
    id: string;
    title: string;
}

export function ModalAddAds() {

    const [games, setGames] = useState<GameList[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => { setGames(response.data) })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hoursStart: data.hoursStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert(`Anuncio criado com sucesso!`)
        } catch (error) {
            console.log(error)
            alert(`Erro ao criar o anúncio!`)
        }
    }

    return (
        <Dialog.Portal >
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[580px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

                <form className='mt-8 flex flex-col gap-4' onSubmit={handleCreateAd}>

                    <div className='flex flex-col gap-2' >
                        <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                        <Select.Root name='game'>

                            <Select.SelectTrigger aria-label="Game" className="bg-zinc-900 py-3 px-4 rounded text-small text-zinc-500 flex justify-between">
                                <Select.SelectValue placeholder="Selecione o Jogo que deseja Jogar" />
                                <Select.SelectIcon>
                                    <CaretDown size={24} className="text-zinc-400" />
                                </Select.SelectIcon>
                            </Select.SelectTrigger>

                            <Select.Portal className='flex top-0'>

                                <Select.SelectContent className="bg-zinc-900 rounded" >

                                    <Select.SelectViewport>
                                        <Select.SelectGroup defaultValue="">
                                            {games.map((game) => {
                                                return (
                                                    <Select.SelectItem key={game.id} className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white" value={game.id} >
                                                        <Select.ItemText>{game.title}</Select.ItemText>
                                                        <Select.SelectItemIndicator><Check size={24} className="text-emerald-500" /></Select.SelectItemIndicator>
                                                    </Select.SelectItem>
                                                );
                                            })}
                                        </Select.SelectGroup>
                                    </Select.SelectViewport>

                                </Select.SelectContent>
                            </Select.Portal>

                        </Select.Root>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input name='name' id="name" type="text" placeholder='Como te chamam dentro do game?' required />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                            <Input name='yearsPlaying' id="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO!' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input name='discord' id="discord" type="text" placeholder='Usuario#0000' required/>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root type='multiple' className='flex gap-1' onValueChange={setWeekDays} value={weekDays}>
                                <ToggleGroup.Item value='0' className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Domingo'>D</ToggleGroup.Item>
                                <ToggleGroup.Item value='1' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Segunda'>S</ToggleGroup.Item>
                                <ToggleGroup.Item value='2' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Terça'>T</ToggleGroup.Item>
                                <ToggleGroup.Item value='3' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quarta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item value='4' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quinta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item value='5' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sexta'>S</ToggleGroup.Item>
                                <ToggleGroup.Item value='6' className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sabado'>S</ToggleGroup.Item>
                            </ToggleGroup.Root>

                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="hoursStart">Qual horario do dia?</label>
                            <div className='flex flex-cols-2 gap-2'>
                                <Input name='hoursStart' id="hoursStart" type="time" placeholder='De' required/>
                                <Input name='hourEnd' id="hourEnd" type="time" placeholder='Até' required/>
                            </div>

                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)} className='w-6 h-6 p-1 rounded bg-zinc-900'>
                            <Checkbox.Indicator>
                                <Check className='h-4 w-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de Voz.
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                        <button className='bg-violet-500 flex items-center gap-3 px-5 h-12 rounded-md font-semibold hover:bg-violet-600' type='submit'><GameController size={24} /> Encontrar duo</button>
                    </footer>

                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}