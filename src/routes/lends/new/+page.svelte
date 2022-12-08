<script>
    import { Lend, Book, Student } from "$lib/Models";
    import { page } from "$app/stores";
    import Input from "$lib/components/Input.svelte";
    import Fielsets from "$lib/components/Fielsets.svelte";
    import { goto } from "$app/navigation";
    import { loading } from "$lib/loading";
    export let data;
    const id = $page.url.searchParams.get("book") || "";
    const students = data.students.map((student) => new Student(student));
    let book = {};
    if (id) book = data.books.find((book) => book.id == id);

    let lend = new Lend({ book });
    let assistant = {
        book: "",
        student: "",
        newStudent: true,
    };
    const createLend = async () => {
        $loading = true;
        await Promise.all([
            lend.create("book(id, quantity)"),
            lend.book.update({ quantity: lend.book.quantity - 1 }),
        ]);
        goto(`/books/${lend.book.id}`);
    };
</script>

<svelte:head>
    <title>Presta un libro</title>
</svelte:head>

<form on:submit|preventDefault={createLend}>
    <div class="panel grid gap">
        <h2 style="text-align: center;">Libro</h2>
        {#if lend.book.id}
            <div>
                <h3>{lend.book.name}</h3>
                <p class="gray">{lend.book.author.name}</p>
                <p class="gray">{lend.book.area.name}</p>
            </div>
            <button
                type="button"
                style="color: white; background: var(--cyan)"
                on:click={(e) => (lend.book = new Book())}>Elegir otro</button
            >
        {:else}
            <p>
                <label for="lend[book]">Seleccione un libro</label>
                <Input
                    type="text"
                    required
                    bind:value={assistant.book}
                    suggestions={data.books}
                    id="lend[book]"
                    onEnter={(book) => {
                        lend.book = new Book(book);
                    }}
                />
            </p>
        {/if}
    </div>
    <div class="panel grid gap">
        <h2 style="text-align: center;">Estudiante</h2>
        {#if lend.student.id}
            <div>
                <h3>{lend.student.fullName}</h3>
                <p class="gray">{lend.student.grade} de {lend.student.nivel}</p>
            </div>
            <button
                type="button"
                style="color: white; background: var(--cyan)"
                on:click={(e) => (lend.student = new Student())}
                >Elegir otro</button
            >
        {:else}
            <div class="grid gap2">
                <div class="grid auto-fit gap2">
                    <button
                        type="button"
                        class:active={assistant.newStudent}
                        on:click={(e) => {
                            assistant.newStudent = true;
                            lend.student = new Student();
                        }}>Existente</button
                    >
                    <button
                        type="button"
                        class:active={!assistant.newStudent}
                        on:click={(e) => {
                            assistant.newStudent = false;
                            lend.student = new Student();
                        }}>Nuevo</button
                    >
                </div>
                {#if assistant.newStudent}
                    <p>
                        <label for="lend[student][name]"
                            >Nombre del estudiante</label
                        >
                        <Input
                            suggestions={students}
                            required
                            type="text"
                            id="lend[student][name]"
                            bind:value={assistant.student}
                            property="fullName"
                            onEnter={(student) => {
                                lend.student = new Student(student);
                            }}
                        />
                    </p>
                {:else}
                    <Fielsets
                        object={lend.student}
                        entries={lend.student.new}
                    />
                {/if}
            </div>
        {/if}
    </div>
    <p>
        <label for="lend[return_date]">Fecha de retorno</label>
        <Input
            type="date"
            required
            bind:value={lend.return_date}
            id="lend[return_date]"
        />
    </p>
    <button>Agregar prestamo</button>
</form>

<style>
    .active {
        background: var(--green);
        color: white;
    }
</style>
