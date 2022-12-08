<script>
    import { Book, Lend } from "$lib/Models";
    import Clock from "$lib/svgs/Clock.svelte";
    import User from "$lib/svgs/User.svelte";
    import Area from "$lib/svgs/Area.svelte";
    import Edit from "$lib/svgs/Edit.svelte";
    import Home from "$lib/svgs/Home.svelte";
    import Papers from "$lib/svgs/Papers.svelte";
    import Pin from "$lib/svgs/Pin.svelte";
    import Back from "$lib/components/Back.svelte";
    import { goto } from "$app/navigation";
    import Give from "$lib/svgs/Give.svelte";
    import Lends from "$lib/components/Lends.svelte";
    import Table from "$lib/components/Table.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    export let data;
    const book = new Book(data.book);
    const lends = data.lends.map((lend) => new Lend(lend));
    const deleteBook = async () => {
        await book.delete();
        goto("/books");
    };
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const data = await book.file(file);
        book.image = data.publicUrl;
        await book.update({ image: data.publicUrl });
    };
</script>

<svelte:head>
    <title>{book.name}</title>
</svelte:head>
<Back />
<header class="flex gap space-between wrap">
    <section class="flex gap2 wrap">
        <label>
            <img src={book.image || "/Portrait.svg"} alt={book.name} />
            <input type="file" style="display: none" on:change={uploadImage} />
        </label>
        <div class="flex column gap2">
            <h1>{book.name}</h1>
            <div class="flex gap align-items-center">
                <User fill="gray" width="1rem" height="1rem" />
                <p style="color: gray">{book.author.name}</p>
            </div>
            <div class="flex gap align-items-center">
                <Area fill="gray" width="1rem" height="1rem" />
                <p class="gray">{book.area.name}</p>
            </div>
            <div class="flex gap align-items-center">
                <Home fill="gray" width="1rem" height="1rem" />
                <p class="gray">{book.editorial.name}</p>
            </div>
            <div class="flex gap align-items-center">
                <Papers fill="gray" width="1rem" height="1rem" />
                <p class="gray">{book.quantity}</p>
            </div>
            <div class="flex gap align-items-center">
                <Pin stroke="white" fill="gray" width="1rem" height="1rem" />
                <p class="gray">{book.position}</p>
            </div>
            <div class="flex gap align-items-center">
                <Clock fill="gray" width="1rem" height="1rem" />
                <p class="gray">{book.created_at.toLocaleString()}</p>
            </div>
        </div>
    </section>
    <section>
        <div class="flex gap">
            {#if book.quantity}
                <a
                    class="button"
                    href={`/lends/new?book=${book.id}`}
                    style="background-color: var(--blue); color: white"
                >
                    <Give width="1rem" height="1rem" fill="white" />
                    Prestar
                </a>
            {/if}
            <a
                class="button"
                href={`/books/${book.id}/edit`}
                style="background-color: var(--orange); color: white"
            >
                <Edit fill="white" width="1rem" height="1rem" />
                Editar
            </a>
            {#if !lends.length}
                <button
                    on:click={deleteBook}
                    style="background-color: var(--red); color: white"
                >
                    <Home fill="white" width="1rem" height="1rem" />
                    Eliminar
                </button>
            {/if}
        </div>
    </section>
</header>
<div class="divider" />
<section class="grid gap2">
    <h2 style="text-align: center;">Prestamos</h2>
    <Lends {lends} let:items let:active>
        <Pagination array={items} let:items class="grid gap2">
            <Table
                array={items}
                properties={active
                    ? Lend.actives.slice(1, Lend.actives.length)
                    : Lend.returned.slice(1, Lend.returned.length)}
                let:item
            >
                {#if active}
                    <td>
                        <a href={`/lends/${item.id}`}>Devolver</a>
                    </td>
                {/if}
            </Table>
        </Pagination>
    </Lends>
</section>

<style>
    label {
        width: 12rem;
        aspect-ratio: 2/3;
        padding: 0;
    }
    label > img {
        width: 100%;
        height: 100%;
    }
</style>
