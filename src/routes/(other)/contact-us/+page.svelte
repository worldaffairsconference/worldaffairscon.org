<script>
    import {onMount} from 'svelte';

    onMount(() => {
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                window.location.reload();
            }
        });
    });
</script>

<form action="https://formspree.io/f/xblqjqvq" method="POST">
    <label>
            Name:
            <input type='text' name='name'>
    </label>
    
    <label>
            Email Address:
            <input type='email' name='email'>
    </label>

    <label>
            Attendee Type: (e.g., speaker, student)
            <input type='text' name='role'>
    </label>

    <label>
            Organization:
            <input type='text' name='organization'>
    </label>

    <label>
            Subject:
            <input type='text' name='subject'>
    </label>

    <label>
            Message:
            <input type='text' name='message'>
    </label>

    <button type="submit">Send</button>
</form>

<style>
    form {
        margin-top: 200px;
        margin-right: 650px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 15px;
        border-radius: 10px;
    }

    label {
        color: white;
    }

    button {
        color: white;
        font-size: 18px;
        gap: 15px;
        margin: 50px auto;
        padding: 25px;
        border-radius: 10px;
        margin-right: 55px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    input {
        color: black;
    }
</style>