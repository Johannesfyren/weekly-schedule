export type formType = {
    fk_user: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    week: number;
    year: number;
};
export type formTypeInherited = {
    setFormData: (data: formType) => void;
    formData: formType | undefined;
};
export default function WeekPlanForm({
    setFormData,
    formData,
}: formTypeInherited) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "6px",
                    marginTop: "35px",
                    marginRight: "10px",
                    fontWeight: "400px",
                }}
            >
                <h2 style={{ fontWeight: "400" }}>Mandag</h2>
                <h2 style={{ fontWeight: "400" }}>Tirsdag</h2>
                <h2 style={{ fontWeight: "400" }}>Onsdag</h2>
                <h2 style={{ fontWeight: "400" }}>torsdag</h2>
                <h2 style={{ fontWeight: "400" }}>Fredag</h2>
            </div>
            <form className="week-form">
                <div>
                    <fieldset name="labels" className="form-headers">
                        <label>Spiser</label>
                        <label>Spiser ikke</label>
                        <label>Ved ikke</label>
                    </fieldset>
                    <fieldset name="fs_mandag">
                        <input
                            type="radio"
                            value={1}
                            checked={formData?.mon === 1}
                            onChange={handleChange}
                            name="mon"
                        />
                        <input
                            type="radio"
                            value={2}
                            checked={formData?.mon === 2}
                            onChange={handleChange}
                            name="mon"
                        />
                        <input
                            type="radio"
                            value={3}
                            checked={formData?.mon === 3}
                            onChange={handleChange}
                            name="mon"
                        />
                    </fieldset>

                    <fieldset name="fs_tirsdag">
                        <input
                            type="radio"
                            value={1}
                            checked={formData?.tue === 1}
                            onChange={handleChange}
                            name="tue"
                        />
                        <input
                            type="radio"
                            value={2}
                            checked={formData?.tue === 2}
                            onChange={handleChange}
                            name="tue"
                        />
                        <input
                            type="radio"
                            value={3}
                            checked={formData?.tue === 3}
                            onChange={handleChange}
                            name="tue"
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            type="radio"
                            value={1}
                            checked={formData?.wed === 1}
                            onChange={handleChange}
                            name="wed"
                        />
                        <input
                            type="radio"
                            value={2}
                            checked={formData?.wed === 2}
                            onChange={handleChange}
                            name="wed"
                        />
                        <input
                            type="radio"
                            value={3}
                            checked={formData?.wed === 3}
                            onChange={handleChange}
                            name="wed"
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            type="radio"
                            value={1}
                            checked={formData?.thu === 1}
                            onChange={handleChange}
                            name="thu"
                        />
                        <input
                            type="radio"
                            value={2}
                            checked={formData?.thu === 2}
                            onChange={handleChange}
                            name="thu"
                        />
                        <input
                            type="radio"
                            value={3}
                            checked={formData?.thu === 3}
                            onChange={handleChange}
                            name="thu"
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            type="radio"
                            value={1}
                            checked={formData?.fri === 1}
                            onChange={handleChange}
                            name="fri"
                        />
                        <input
                            type="radio"
                            value={2}
                            checked={formData?.fri === 2}
                            onChange={handleChange}
                            name="fri"
                        />
                        <input
                            type="radio"
                            value={3}
                            checked={formData?.fri === 3}
                            onChange={handleChange}
                            name="fri"
                        />
                    </fieldset>
                </div>
            </form>
        </div>
    );
}
