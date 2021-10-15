'use strict'

const Pair = require('../models/pair.model');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database');

// GET /pairs
async function getPairs (req, res) {
    const pairs = await Pair.findAll();
    return res.status(200).send({
        message: 'success',
        data: pairs
    });
}

// GET /pairsName
async function getPairsName (req, res) {
    const sql = "SELECT p1.pair_id as id, t1.token_name as tkA, t2.token_name as tkB, e1.exchange_name as exch FROM pairs p1 INNER JOIN tokens t1 ON t1.token_id = p1.tokenA LEFT JOIN tokens t2 ON t2.token_id = p1.tokenB INNER JOIN exchanges e1 ON e1.exchange_id = p1.pair_exchange";
    const pairs = await sequelize.query(sql, { type: QueryTypes.SELECT});
    return res.status(200).send({
        message: 'success',
        data: pairs
    });
}

// GET /pair/id
async function getPair (req, res) {
    const id = req.params.id;
    const pair = await Pair.findAll({
        where: {
          pair_id: id
        }
    });
    return res.status(200).send({
        message: 'success',
        data: pair
    });
}

// POST /pair/create
async function addPair (req, res) {
    const pair = await Pair.create({
        tokenA: req.body.tokenA,
        tokenB: req.body.tokenB,
        pair_exchange: req.body.pair_exchange,
    });
    return res.status(200).send({
        message: 'success',
        data: pair
    });
}

// POST /pair/edit/2
async function editPair (req, res) {
    const id = req.params.id;
    const pair = await Pair.update({ 
        tokenA: req.body.tokenA,
        tokenB: req.body.tokenB,
        pair_exchange: req.body.pair_exchange, }, {
        where: {
            pair_id: id
        }
    })
    .then(async (result) => {
        const pair = await Pair.findByPk(id);
        console.log(pair);
        return res.status(200).send({
            message: 'success',
            data: pair
        })
    })
    .catch((err) => {
        return res.status(500);
    });
}

module.exports = {
    getPairs,
    getPairsName,
    addPair,
    getPair,
    editPair
}