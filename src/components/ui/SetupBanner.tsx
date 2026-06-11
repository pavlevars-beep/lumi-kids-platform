export function SetupBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
      <p className="text-amber-800 font-semibold mb-1">⚙️ Supabase nije konfigurisan</p>
      <p className="text-amber-700 text-sm">
        Prikazuju se demo podaci. Pogledajte <code className="bg-amber-100 px-1 rounded">README.md</code> za uputstvo o podešavanju Supabase baze podataka.
      </p>
    </div>
  )
}
