

<form>
    <!-- Can be multiple files -->
    <input type="file" name="files" />
    <input type="submit" value="Submit" />
  
</form>
  
<script type="text/javascript">
	import { onMount } from "svelte";


    onMount(() => {
        const form = document.querySelector('form');
  
        form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        await fetch('http://127.0.0.1:1337/api/upload', {
            method: 'post',
            body: new FormData(form)
        });
        });
    })
    
</script>