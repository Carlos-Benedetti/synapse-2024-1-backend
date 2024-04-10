
function demoradora():Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log("foi")
            resolve()
        }, 1000);
    })
}

demoradora().then(()=>{
    console.log('processador 1 terminou')
})
console.log('processador 1 terminou')
