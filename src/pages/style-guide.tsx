function StyleGuide() {
  return (
    <>
      <div className="mb-8">
        <div className="mb-2 text-xl font-semibold">
          Buttons with brand colors
        </div>
        <button className="btn mr-2">Button</button>
        <button className="btn btn-primary mr-2">Button</button>
        <button className="btn btn-secondary mr-2">Button</button>
        <button className="btn btn-accent mr-2">Button</button>
        <button className="btn btn-ghost mr-2">Button</button>
        <button className="btn btn-link">Button</button>
      </div>

      <div className="mb-8">
        <div className="mb-2 text-xl font-semibold">
          Buttons with state colors
        </div>
        <button className="btn btn-info mr-2">Info</button>
        <button className="btn btn-success mr-2">Success</button>
        <button className="btn btn-warning mr-2">Warning</button>
        <button className="btn btn-error">Error</button>
      </div>

      <div className="mb-8">
        <div className="mb-2 text-xl font-semibold">Outline buttons</div>
        <button className="btn btn-outline mr-2">Button</button>
        <button className="btn btn-outline btn-primary mr-2">Button</button>
        <button className="btn btn-outline btn-secondary mr-2">Button</button>
        <button className="btn btn-outline btn-accent">Button</button>
      </div>
    </>
  );
}

export default StyleGuide;
