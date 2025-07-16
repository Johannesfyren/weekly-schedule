export default function WeekPlanForm() {
    return (
        <>
            <form className="week-form">
                <div>
                    <fieldset name="labels" className="form-headers">
                        <label>Spiser</label>
                        <label>Spiser ikke</label>
                        <label>Ved ikke</label>
                    </fieldset>
                    <fieldset name="fs_mandag">
                        <label htmlFor="mandag">mandag</label>
                        <input type="radio" value={1} name="mandag" />
                        <input type="radio" value={2} name="mandag" />
                        <input
                            type="radio"
                            value={3}
                            defaultChecked
                            name="mandag"
                        />
                    </fieldset>

                    <fieldset name="fs_tirsdag">
                        <label htmlFor="tirsdag">tirsdag</label>
                        <input type="radio" value={1} name="tirsdag" />
                        <input type="radio" value={2} name="tirsdag" />
                        <input
                            type="radio"
                            value={3}
                            defaultChecked
                            name="tirsdag"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="onsdag">onsdag</label>
                        <input type="radio" value={1} name="onsdag" />
                        <input type="radio" value={2} name="onsdag" />
                        <input
                            type="radio"
                            value={3}
                            defaultChecked
                            name="onsdag"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="torsdag">torsdag</label>
                        <input type="radio" value={1} name="torsdag" />
                        <input type="radio" value={2} name="torsdag" />
                        <input
                            type="radio"
                            value={3}
                            defaultChecked
                            name="torsdag"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="fredag">fredag</label>
                        <input type="radio" value={1} name="fredag" />
                        <input type="radio" value={2} name="fredag" />
                        <input
                            type="radio"
                            value={3}
                            defaultChecked
                            name="fredag"
                        />
                    </fieldset>
                </div>
                <button type="submit" onClick={(e) => e.preventDefault()}>
                    gogo
                </button>
            </form>
        </>
    );
}
