<script>

    let { currentField = $bindable()} = $props();


</script>

    <fieldset class="w-full m-2 fieldset bg-base-200 border-sky-600 rounded-box border px-2">
        <legend class="fieldset-legend">Field Details</legend>


        <div class="px-1">
            <fieldset class="fieldset">
            <legend class="fieldset-legend">Label</legend>
            <input type="text" class="input w-64 text-black" bind:value={currentField.label} />
            </fieldset>
        </div>

        <div class="px-1">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Type</legend>
                <select class="select text-black" bind:value={currentField.subType}>
                    <option disabled selected>Pick a Field Type</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                </select>
            </fieldset>
        </div>

        <div class="px-1">
            <fieldset class="fieldset">
            <legend class="fieldset-legend">Place Holder</legend>
            <input type="text" class="input w-64 text-black" bind:value={currentField.placeHolder} />
            </fieldset>
        </div>

        <div class="px-1 flex justify-between">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Min Size</legend>
                <input type="number" class="input w-24 text-black " bind:value={currentField.minSize} />
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Max Size</legend>
                <input type="number" class="input w-24 text-black " bind:value={currentField.maxSize} />
            </fieldset>

        </div>

        <div class="px-1 flex justify-between">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Mandatory</legend>
                <input type="checkbox" bind:checked={currentField.mandatoryFlag} class="toggle toggle-error" />
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Editable</legend>
                <input type="checkbox" bind:checked={currentField.editable} class="toggle toggle-error" />
            </fieldset>            
        </div>



    </fieldset>    

