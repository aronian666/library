<script>
    import { Lend } from "$lib/Models";
    import { goto } from "$app/navigation";
    import { loading } from "$lib/loading";
    export let data;
    let lend = new Lend(data.lend);
    const updateLend = async () => {
        $loading = true;
        await Promise.all([
            lend.update({
                return_day: new Date(),
                message: lend.message,
            }),
            lend.book.update({
                quantity: lend.book.quantity + 1,
            }),
        ]);
        goto(`/books/${lend.book.id}`);
    };
</script>

<svelte:head>
    <title>Devolver: {lend.book.name}</title>
</svelte:head>
<h1 style="text-align: center;">Devolver libro</h1>
<form on:submit|preventDefault={updateLend}>
    <div>
        <p>Estudiante</p>
        <span>{lend.student.name}</span>
    </div>
    <div>
        <p>Libro</p>
        <span>{lend.book.name}</span>
    </div>
    <div>
        <p>Fecha de prestamo</p>
        <span>{lend.created_at.toLocaleString()}</span>
    </div>
    <div>
        <p>Fecha de retorno</p>
        <span>{lend.return_date.toLocaleString()}</span>
    </div>
    <div>
        <p>Dias restantes</p>
        <span>{lend.days}</span>
    </div>
    <div>
        <label for="lend[message]">Observaciones</label>
        <input type="text" bind:value={lend.message} />
    </div>
    <button>Devolver</button>
</form>

<style>
    p {
        font-weight: bold;
    }
    span {
        color: gray;
    }
</style>
