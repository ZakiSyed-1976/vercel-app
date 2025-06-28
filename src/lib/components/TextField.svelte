<script>
    let { field } = $props();
</script>
<div  id={field.id} role="log" class=" m-2 px-8 py-2"> 
    <div class="my-2 w-72 flex justify-between text-black font-bold">
        <p class="label">{field.PLACE_HOLDER}</p>                        
    </div>
    <div class="flex items-center">
        {#if field.EDITABLE == 1}
            {#if field.MANDATORY == 1}
                <input name={field.PLACE_HOLDER.replaceAll(" ",'_').toLowerCase()} type={field.SUB_TYPE} class="input w-72 border border-red-300" placeholder="{field.LABEL}" required/>
            {:else}
                <input name={field.PLACE_HOLDER.replaceAll(" ",'_').toLowerCase()} type={field.SUB_TYPE} class="input w-72" placeholder="{field.LABEL}" />
            {/if}
        {:else}
            <input name={field.PLACE_HOLDER.replaceAll(" ",'_').toLowerCase()} type={field.SUB_TYPE} class="input w-72" placeholder="{field.LABEL}" readonly/>
        {/if}
        {#if field.MANDATORY == 1}
            <span class="px-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">
                    <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
                </svg>
            </span>
        {/if}
    </div>
</div>    
