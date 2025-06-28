<script>
    import { applyAction, enhance } from '$app/forms'

    import TextField from "$lib/components/TextField.svelte";

    let { data, form } = $props();
    let { formFields } = data;
    
    console.log(`/form/+page.svelte:: formFields `, formFields);

    let loading = $state(false);

</script>

<div class="h-full flex p-2 bg-slate-100 text-black rounded-2xl">
    <div class="w-full m-1">
        <fieldset class="fieldset bg-base-200 border-gray-400 rounded-box border p-4 scroll-auto">
            <legend class="fieldset-legend">Human Resource</legend>
            {#if  loading}                
                <span class="loading loading-dots loading-xs"></span>
                <span class="loading loading-dots loading-sm"></span>
                <span class="loading loading-dots loading-md"></span>
                <span class="loading loading-dots loading-lg"></span>
                <span class="loading loading-dots loading-xl"></span>

            {:else}
                {#if form?.success}
                    <div class="toast">
                    <div class="alert alert-info">
                        <span>Successfully Saved the Record.</span>
                    </div>
                </div>
                {/if}
                <form method="POST" action="?/saveRecord" 
                    use:enhance={({ formElement, formData, action, cancel }) => {
                        loading = true;
                        console.log(`formData `, ...formData);
                        return async ({ result }) => {
                            // `result` is an `ActionResult` object
                            if (result.type === 'redirect') {
                                goto(result.location);
                            } else {
                                await applyAction(result);
                            }
                            loading = false                            
                        };
                    }}
                >
                    <div class="px-2 grid grid-cols-1 md:grid-cols-2 place-content-start justify-items-center ">

                            {#each formFields as field}
                                <TextField {field}></TextField>
                            {/each}
                    </div>
                    <div class="flex justify-center items-center">
                        <button type="submit" class="btn btn-info text-white">Save</button>
                    </div>    
                </form>
            {/if}

        </fieldset>        
    </div>        
</div>