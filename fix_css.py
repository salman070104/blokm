import re

with open('style.css', 'r') as f:
    css = f.read()

# Remove the old .lang-switcher block entirely and replace it
new_css_block = """
/* ==========================================================================
   LANGUAGE TOGGLE BUTTON
   ========================================================================== */
.lang-toggle-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    width: 48px;
    height: 38px;
    color: var(--color-white);
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.lang-toggle-btn:hover {
    border-color: rgba(201, 168, 76, 0.3);
    background: rgba(255, 255, 255, 0.08);
    color: var(--color-gold);
}

html.light-theme .lang-toggle-btn {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.08);
    color: var(--color-black);
}

html.light-theme .lang-toggle-btn:hover {
    border-color: rgba(184, 148, 47, 0.3);
    background: rgba(0, 0, 0, 0.06);
    color: var(--color-gold-dark);
}
"""

# The original lang-switcher CSS is around line 1378
# I'll just append this new block to the end of the file and remove the old lines 
# wait, it's safer to just remove all lines that match `.lang-switcher`, `.lang-btn`, `.lang-slider` 
# I will use a regex to replace the whole block from `.lang-switcher {` down to `.mobile-lang-switcher .lang-slider { ... }` or just remove them one by one.

# Let's remove them safely.
css = re.sub(r'html\.light-theme \.lang-switcher \{.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'html\.light-theme \.lang-switcher:hover \{.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'html\.light-theme \.lang-btn\.active \{.*?\}', '', css, flags=re.DOTALL)

# main block
css = re.sub(r'\.lang-switcher \{.*?\.lang-slider \{.*?\}', new_css_block, css, flags=re.DOTALL)

# mobile block
css = re.sub(r'\.mobile-lang-switcher \{.*?html\.lang-en \.mobile-lang-switcher \.lang-slider \{.*?\}', '', css, flags=re.DOTALL)

# mobile hide
css = re.sub(r'\.header-right > \.lang-switcher', '.header-right > .lang-toggle-btn', css)

with open('style.css', 'w') as f:
    f.write(css)
