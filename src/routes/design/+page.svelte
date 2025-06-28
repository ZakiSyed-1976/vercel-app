<script>

    import FieldAttributes from "$lib/components/InputFieldAttributes.svelte";	

    let { data } = $props();

    let inputFields = $state([
        {id: 0, type: 'INPUT', subType: 'text', editable: true, label: 'Enter First Name', placeHolder: 'First Name', mandatoryFlag: true, minSize: 1, maxSize: 50},
        {id: 1, type: 'INPUT', subType: 'number', editable: false, label: 'Enter Middle Name', placeHolder: 'Middle Name', mandatoryFlag: false, minSize: 1, maxSize: 50},
        {id: 2, type: 'INPUT', subType: 'text', editable: true, label: 'Enter Last Name', placeHolder: 'Last Name', mandatoryFlag: true, minSize: 1, maxSize: 50}
    ]); 

    let currentField = $state({});
    
    let saving = $state(false);

    function appendTextField(event) {

        let inputFieldsAttributes = {
            id: inputFields.length,
            type: 'INPUT',
            subType: 'text',
            editable: true,
            label: 'Label for Field.',
            placeHolder: 'Place Holder for Field',
            mandatoryFlag: true,
            minSize: 1,
            maxSize: 50
        }
        inputFields[inputFields.length] = inputFieldsAttributes;
    }

    function loadFieldAttributes(event) {
        console.log(event.target)
        let id = event.target.id;
        console.log(` ID :: `, id)
        currentField = inputFields.find(inputField => { return inputField.id == id});
        console.log($state.snapshot(currentField));
                
    }

    function removeField(event) {
        console.log(event.target)
        let id = event.target.id;
        inputFields = inputFields.filter(inputField => inputField.id != id);
        console.log($state.snapshot(inputFields));
    }

    async function saveForm() {
        saving = true;
        const response = await fetch('/api/form_design', {
            method: 'POST',
            body: JSON.stringify(inputFields),
            headers: {
                'Content-Type': 'application/json'
            }
        });        
        let result = await response.json();
        if(result.success) {
            alert('Form Fields Saved');
        }else {
            alert('Unable to Save Form Fields');
        }
        saving = false;
    }

</script>

<div class="h-full flex">
    <div class="w-9/12 m-1">
        <div class="flex justify-end-safe">
            {#if saving}
                <button class="btn btn-circle btn-sm bg-sky-400 text-white" aria-label="save">
                    <span class="loading loading-spinner loading-lg"></span>
                </button>            
            {:else}
                <button class="btn btn-circle btn-sm bg-sky-400 text-white" aria-label="save" onclick={saveForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                        <path d="M8 7c3.314 0 6-1.343 6-3s-2.686-3-6-3-6 1.343-6 3 2.686 3 6 3Z" />
                        <path d="M8 8.5c1.84 0 3.579-.37 4.914-1.037A6.33 6.33 0 0 0 14 6.78V8c0 1.657-2.686 3-6 3S2 9.657 2 8V6.78c.346.273.72.5 1.087.683C4.42 8.131 6.16 8.5 8 8.5Z" />
                        <path d="M8 12.5c1.84 0 3.579-.37 4.914-1.037.366-.183.74-.41 1.086-.684V12c0 1.657-2.686 3-6 3s-6-1.343-6-3v-1.22c.346.273.72.5 1.087.683C4.42 12.131 6.16 12.5 8 12.5Z" />
                    </svg>
                </button>
            {/if}
            
        </div>
        <fieldset class="fieldset bg-base-200 border-gray-400 rounded-box border p-4 scroll-auto">
            <legend class="fieldset-legend">Human Resource</legend>
            <div class="px-2 grid grid-cols-1 md:grid-cols-2 place-content-start justify-items-center ">

                {#each inputFields as field}
                    <div  id={field.id} ondblclick="{loadFieldAttributes}" role="log" class=" m-2 px-8 py-2 {field.id == currentField.id ? 'bg-gray-200 shadow-xl shadow-gray-600': 'bg-slate-200 shadow-xl shadow-gray-200'}"> 
                                            
                        <div class="my-2 w-72 flex justify-between text-black font-bold">
                            <p class="label">{field.label}</p>                        

                            <button class="btn btn-circle" id={field.id} onclick={removeField} aria-label="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4" id={field.id}>
                                    <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" id={field.id}/>
                                </svg>

                            </button>
                        </div>

                        <input type={field.subType} class="input w-72" placeholder="{field.placeHolder} / {field.subType}" readonly/>
                        <div class="w-72 flex justify-between text-black">
                            <p class="label">min : {field.minSize}</p>                        
                            <p class="label ">{field.mandatoryFlag == true ? 'Mandatory' : ' Optional '}</p>
                            <p class="label ">
                                {#if field.editable}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="green" class="size-4">
                                        <path d="M11.5 1A3.5 3.5 0 0 0 8 4.5V7H2.5A1.5 1.5 0 0 0 1 8.5v5A1.5 1.5 0 0 0 2.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 9.5 7V4.5a2 2 0 1 1 4 0v1.75a.75.75 0 0 0 1.5 0V4.5A3.5 3.5 0 0 0 11.5 1Z" />
                                    </svg>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">
                                        <path fill-rule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clip-rule="evenodd" />
                                    </svg>
                                {/if}
                            </p>
                            <p class="label">max : {field.maxSize}</p>
                        </div>
                    </div>                    
                {/each}
            </div>
        </fieldset>
    </div>    
    <div class="w-3/12 bg-gray-600">
        <div class="h-1/3 flex justify-start">
            <button class="m-2 btn btn-outline rounded-xl" onclick={appendTextField}>Add Input</button>
        </div>
        <div class="m-1.5 grid place-content-center justify-items-center bg-slate-50 rounded-2xl">            
            <FieldAttributes bind:currentField={currentField}/>
        </div>
    </div>
</div>