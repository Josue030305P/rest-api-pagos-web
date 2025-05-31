export function Pago(tasaPeriodica, numcuotas, monto) {
    
    if (tasaPeriodica === 0) {
        return monto / numcuotas;
    }
    const PMT = (monto * tasaPeriodica) / (1 - Math.pow(1 + tasaPeriodica, -numcuotas));
    
    return PMT;
}