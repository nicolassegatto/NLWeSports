//FORMA PADRÃO DE IMPORTAR DEPENDENDENCIAS: const express = require('express')
// IMPORTADO COM: ECMA SCRIPTS MODELS, PARA ISSO ALTERAMOS O PACKAGE-JSON, E MUDAMOS A EXTENÇÃO DO ARAQUIVO JS PARA .MJS
import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'
import { hourConverter } from './utils/convertHour';
import { hourDisconverter } from './utils/disconvertHour';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient()
// localhost:3333/ads
//primeiro parametro é a URL e o segundo parametro é uma função que será executada que necessariamente é passado dois parametros, req e res.

//Tipos de parametros
//query param:
//route param:
//body param:

app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return response.status(200).json(games)
})

app.post('/games/:gameId/ads', async (request, response) => {
    const gameId = request.params.gameId;
    const body: any = request.body

    const ad = await prisma.ad.create({
     data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hoursStart: hourConverter(body.hoursStart),
        hourEnd: hourConverter(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel
     }
    })

    return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(OBJ => {
        return {
            ...OBJ,
            weekDays: OBJ.weekDays.split(','),
            hoursStart: hourDisconverter(OBJ.hoursStart),
            hourEnd: hourDisconverter(OBJ.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord,
    })
})

app.listen(3333)