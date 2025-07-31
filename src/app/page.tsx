useEffect(() => {
  const fetchData = async () => {
    const walletProvider = sdk.getWalletProvider();
    await walletProvider.connect();
    const addr = await walletProvider.getAddress();
    setAddress(addr);

    const { data, error } = await supabase
      .from("users")
      .select("points, energy, last_energy_reset")
      .eq("wallet_address", addr)
      .single();

    if (error || !data) {
      console.error("User tidak ditemukan:", error);
      return;
    }

    const now = new Date();
    const lastReset = data.last_energy_reset ? new Date(data.last_energy_reset) : null;
    const isNewDay = !lastReset || now.toDateString() !== lastReset.toDateString();

    let updatedEnergy = data.energy;
    if (isNewDay) {
      updatedEnergy = 200; // reset to default
      const { error: updateError } = await supabase
        .from("users")
        .update({
          energy: updatedEnergy,
          last_energy_reset: now.toISOString(),
        })
        .eq("wallet_address", addr);

      if (updateError) {
        console.error("Gagal update energy harian:", updateError);
      }
    }

    setPoints(data.points);
    setEnergy(updatedEnergy);
  };

  fetchData();
}, []);
